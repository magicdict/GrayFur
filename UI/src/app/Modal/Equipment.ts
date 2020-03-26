import { SkillInfo } from './SkillInfo';

/**魂骨 */
export class Equipment {
    Name: string;
    Position: EquipmentPosition;
    FirstFunc: SkillInfo;
    SecondFunc: SkillInfo;
    EvolutionName :string; 
}

export enum EquipmentPosition {
    头骨,
    左臂骨,
    右臂骨,
    左腿骨,
    右腿骨,
    躯干骨,
    外附魂骨
}

export class EquipmentCreator {
    public static 泰坦巨猿左臂骨(): Equipment {
        let e = new Equipment();
        e.Name = "泰坦巨猿左臂骨";
        e.Position = EquipmentPosition.左臂骨;
        return e;
    }

    public static 邪魔虎鲸王左腿骨(): Equipment {
        let e = new Equipment();
        e.Name = "邪魔虎鲸王左腿骨";
        e.Position = EquipmentPosition.左腿骨;
        return e;
    }

    public static 蓝银皇右腿骨(): Equipment {
        let e = new Equipment();
        e.Name = "蓝银皇右腿骨";
        e.Position = EquipmentPosition.右腿骨;
        return e;
    }

    public static 天青牛蟒右臂骨(): Equipment {
        let e = new Equipment();
        e.Name = "天青牛蟒右臂骨";
        e.Position = EquipmentPosition.右臂骨;
        return e;
    }

    public static 深海魔鲸王的躯干骨(): Equipment {
        let e = new Equipment();
        e.Name = "深海魔鲸王的躯干骨";
        e.Position = EquipmentPosition.躯干骨;
        return e;
    }

    public static 精神凝聚之智慧头骨(): Equipment {
        let e = new Equipment();
        e.Name = "精神凝聚之智慧头骨";
        e.Position = EquipmentPosition.头骨;
        return e;
    }

    public static 外附魂骨八蛛矛(): Equipment {
        let e = new Equipment();
        e.Name = "外附魂骨八蛛矛";
        e.EvolutionName = "海神八翼";
        e.Position = EquipmentPosition.外附魂骨;
        return e;
    }

    //独孤博
    
    public static 万年美杜莎头骨(): Equipment {
        let e = new Equipment();
        e.Name = "万年美杜莎头骨";
        e.Position = EquipmentPosition.头骨;
        return e;
    }

    //比比东
    public static 六翅紫光翼(): Equipment {
        let e = new Equipment();
        e.Name = "六翅紫光翼";
        e.Position = EquipmentPosition.外附魂骨;
        return e;
    }

    public static 精神免疫头骨(): Equipment {
        let e = new Equipment();
        e.Name = "精神免疫头骨";
        e.Position = EquipmentPosition.头骨;
        return e;
    }

    public static 死亡蛛皇左臂骨(): Equipment {
        let e = new Equipment();
        e.Name = "死亡蛛皇左臂骨";
        e.Position = EquipmentPosition.左臂骨;
        return e;
    }

    public static 死亡蛛皇右臂骨(): Equipment {
        let e = new Equipment();
        e.Name = "死亡蛛皇右臂骨";
        e.Position = EquipmentPosition.右臂骨;
        return e;
    }

    public static 柔骨兔魂骨(): Equipment {
        let e = new Equipment();
        e.Name = "柔骨兔魂骨";
        e.Position = EquipmentPosition.躯干骨;
        return e;
    }
}