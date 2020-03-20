export class GameElement {
    public id: number;
    public type: string = "";
    public locationX: number;
    public locationY: number;
    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
        this.locationX = id % GameData.maxRow;
        this.locationY = Math.floor(id / GameData.maxRow);
    }
}
export class GameData {
    //最大行列
    public static maxRow = 8;
    public static maxColumn = 8;
    public static elements: Array<GameElement> = new Array(); //元素数组
    //地图数据
    public static mapData: Array<number> = new Array<number>(); //存放对应元素的状态,0代表为空 ， 1代表存在
}
export class ConnectLogic {

    private static isSameType(ele1: GameElement, ele2: GameElement) {
        return ele1.type == ele2.type;
    }
    //同在x轴
    private static onLineX(ele1: GameElement, ele2: GameElement) {
        if (ele1.locationY == ele2.locationY) {
            return true;
        }
        return false;
    }

    //同在y轴
    private static onLineY(ele1: GameElement, ele2: GameElement) {
        if (ele1.locationX == ele2.locationX) {
            return true;
        }
        return false;
    }

    //是否为同个元素
    private static equalsElement(ele1: GameElement, ele2: GameElement) {
        //如果坐标相同则为同一个元素，返回true，否则false
        if (ele1 == ele2) {
            return true;
        }
        return false;
    }

    //是否为空
    private static isEmpty(eleId: number) {
        return !GameData.mapData[eleId];
    }

    //清除元素
    public static clear(ele1: GameElement, ele2: GameElement) {
        GameData.mapData[ele1.id] = 0;
        GameData.mapData[ele2.id] = 0;
    }

    //判断中间是否有线连
    private static hasLine(ele1: GameElement, ele2: GameElement) {
        if (this.equalsElement(ele1, ele2)) {
            return false;
        }
        if (this.onLineX(ele1, ele2)) {
            let min = (ele1.locationX > ele2.locationX ? ele2.id : ele1.id) + 1;//两个元素之间小的元素+1 开始算
            let max = ele1.locationX > ele2.locationX ? ele1.id : ele2.id;//两个元素之间大的元素
            let i: number;
            for (i = 0; i < (max - min); i++) {
                //如果中间的元素不为空，说明不能直接连接
                if (!this.isEmpty(min + i)) {
                    break;
                }
            }
            if (i == (max - min)) {
                return true;
            }
            return false;
        } else if (this.onLineY(ele1, ele2)) {
            let min: number = (ele1.locationY > ele2.locationY ? ele2.id : ele1.id) + GameData.maxRow;//两个元素之间小的元素
            let max: number = ele1.locationY > ele2.locationY ? ele1.id : ele2.id;//两个元素之间大的元素
            let i: number;
            for (i = 0; i < (max - min) / GameData.maxRow; i++) {
                //如果中间的元素不为空，说明不能直接连接
                if (!this.isEmpty(min + i * GameData.maxRow)) {
                    break;
                }
            }
            if (i == (max - min) / GameData.maxRow) {
                return true;
            }
            return false;
        }
        return false;
    }

    //可以通过线段连接
    private static isPassToLined(ele1: GameElement, ele2: GameElement): GameElement[] {
        if ((this.onLineY(ele1, ele2) || this.onLineX(ele1, ele2)) && this.hasLine(ele1, ele2)) {
            return [ele1, ele2];
        }
        return [];
    }

    //封闭元素，不可连接
    private static isCloseElement(ele1: GameElement, ele2: GameElement): boolean {
        let id1 = ele1.id;
        let id2 = ele2.id;
        if (!this.isEmpty(id1 + 1) && !this.isEmpty(id1 - 1) && !this.isEmpty(id1 + GameData.maxRow) && !this.isEmpty(id1 - GameData.maxRow)) {
            return true;
        }
        if (!this.isEmpty(id2 + 1) && !this.isEmpty(id2 - 1) && !this.isEmpty(id2 + GameData.maxRow) && !this.isEmpty(id2 - GameData.maxRow)) {
            return true;
        }
        return false;
    }

    //同x轴或y轴是否可以从侧面连接
    private static isPassFromUpOrDown(ele1: GameElement, ele2: GameElement): GameElement[] {
        let id1 = ele1.id;
        let id2 = ele2.id;
        let pt0: GameElement, pt1: GameElement, pt2: GameElement, pt3: GameElement;
        //每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通  

        //如果都在x轴，则自左至右扫描可能的路径， 
        //因为要连线，所以要从当前出发，不能从0开始遍历
        if (this.onLineX(ele1, ele2)) {
            //往上搜索
            let toTop: number = ele1.locationY + 1; //到顶部的距离
            for (let i = 0; i < toTop; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id - i * GameData.maxRow];
                pt2 = GameData.elements[ele2.id - i * GameData.maxRow];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
            let toBottom: number = GameData.maxRow - ele1.locationY; //到底部的距离
            //往下搜索
            for (let i = 0; i < toBottom; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id + i * GameData.maxRow];
                pt2 = GameData.elements[ele2.id + i * GameData.maxRow];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
        }


        //如果都在y轴，则自上至下扫描可能的路径，  
        //每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通  

        //往左搜索
        let toLeft: number = ele1.locationX + 1;
        if (this.onLineY(ele1, ele2)) {
            for (let i = 0; i < toLeft; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id - i];
                pt2 = GameData.elements[ele2.id - i];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
        }
        let toRight: number = GameData.maxRow - ele1.locationX;
        for (let i = 0; i < toRight; i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.id + i];
            pt2 = GameData.elements[ele2.id + i];
            pt3 = ele2;
            //如果顶点不为空，则该路不通。  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        return [];
    }

    //不规则的连线，之字型连线
    private static isPassIrregular(ele1: GameElement, ele2: GameElement): GameElement[] {
        let id1 = ele1.id;
        let id2 = ele2.id;
        let pt0: GameElement, pt1: GameElement, pt2: GameElement, pt3: GameElement;
        let maxX = ele1.locationX > ele2.locationX ? ele1.locationX : ele2.locationX;
        let maxY = ele1.locationY > ele2.locationY ? ele1.locationY : ele2.locationY;
        //同样，每次构造4个顶点，看是否可通  

        //往上搜索
        for (let i = maxY; i > 0; i--) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationX + i * GameData.maxRow];
            pt2 = GameData.elements[ele2.locationX + i * GameData.maxRow];
            pt3 = ele2;
            //特殊情况，如果pt0和pt1重合  
            if (this.equalsElement(pt0, pt1)) {
                //如果pt2不为空，则此路不通  
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                } else {
                    continue;
                }
            } else if (this.equalsElement(pt2, pt3)) {
                //特殊情况，如果pt2和pt3重合  
                //如果pt1不为空，则此路不通  
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                } else {
                    continue;
                }
            }
            //如果pt1, pt2都不为空,则不通  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }

        //往下搜索
        for (let i = maxY; i < (GameData.maxRow - 1); i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationX + i * GameData.maxRow];
            pt2 = GameData.elements[ele2.locationX + i * GameData.maxRow];
            pt3 = ele2;
            //特殊情况，如果pt0和pt1重合  
            if (this.equalsElement(pt0, pt1)) {
                //如果pt2不为空，则此路不通  
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
                else {
                    continue;
                }
            } else if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
                else {
                    continue;
                }
            }
            //如果pt1, pt2都不为空,则不通  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        //横向扫描可能的路径  
        //往左搜索
        for (let i = 0; i < maxX; i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationY * GameData.maxRow + i];
            pt2 = GameData.elements[ele2.locationY * GameData.maxRow + i];
            pt3 = ele2;
            if (this.equalsElement(pt0, pt1)) {
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
            }
            if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
            }
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        //往右搜索
        for (let i = maxX; i < (GameData.maxRow - 1); i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationY * GameData.maxRow + i];
            pt2 = GameData.elements[ele2.locationY * GameData.maxRow + i];
            pt3 = ele2;
            if (this.equalsElement(pt0, pt1)) {
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
            }
            if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
            }
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        return [];
    }

    private static isAlive(ele1: GameElement) {
        return GameData.mapData[ele1.id];
    }

    public static getPath(ele1: GameElement, ele2: GameElement): boolean {
        //首先判断是不是同一种类型
        if (!this.isSameType(ele1, ele2)) {
            return false;
        }
        //判断这个元素是否存在
        if (!this.isAlive(ele1) || !this.isAlive(ele2)) {
            return false;
        }
        //开始搜索前对ele1,ele2排序,使ele2尽可能的在ele1的右下方,优先把ele1排在左
        let t = ele1;
        if (ele1.locationX > ele2.locationX) {
            ele1 = ele2;
            ele2 = t;
        } else if (ele1.locationX == ele2.locationX) {
            if (ele1.locationY > ele2.locationY) {
                ele1 = ele2;
                ele2 = t;
            }
        }

        //通过分析连连看中两点之间的位置关系，逐步由简到难分析每一种类型 ，顺序不能乱

        //第一种类型， 两点是否在一条直线上，而且两点之间可直线连通 
        let r1 = this.isPassToLined(ele1, ele2);
        if (r1.length) {
            return true;
        }
        //第二种类型， 如果两点中任何一个点被全包围，且两个点不相邻，则不通。  
        let r2 = this.isCloseElement(ele1, ele2);
        if (r2) {
            return false;
        }
        //第三种类型， 两点在一条直线上，但是不能直线连接 ,从上面或者下面连接 
        let r3 = this.isPassFromUpOrDown(ele1, ele2);
        if (r3.length) {
            return true;
        }
        //第四种类型， 两点不在一条直线上。  
        let r4 = this.isPassIrregular(ele1, ele2);
        if (r4.length) {
            return true;
        }
        return false;
    }
}