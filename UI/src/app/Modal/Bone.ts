import { SkillInfo } from './SkillInfo';
import { BoneSkillCreator } from '../Creator/BoneSkillCreator';

/**魂骨 */
export class Bone {
    Name: string;
    Position: BonePosition;
    FirstFunc: SkillInfo;
    SecondFunc: SkillInfo;
    EvolutionName: string;
}

export enum BonePosition {
    头骨,
    左臂骨,
    右臂骨,
    左腿骨,
    右腿骨,
    躯干骨,
    外附魂骨
}

export class BoneCreator {
    public static 泰坦巨猿左臂骨(): Bone {
        let e = new Bone();
        e.Name = "泰坦巨猿左臂骨";
        e.Position = BonePosition.左臂骨;
        return e;
    }

    public static 邪魔虎鲸王左腿骨(): Bone {
        let e = new Bone();
        e.Name = "邪魔虎鲸王左腿骨";
        e.Position = BonePosition.左腿骨;
        e.FirstFunc = BoneSkillCreator.虎鲸碎牙斩();
        e.SecondFunc = BoneSkillCreator.虎鲸邪魔斧();
        return e;
    }

    public static 蓝银皇右腿骨(): Bone {
        let e = new Bone();
        e.Name = "蓝银皇右腿骨";
        e.Position = BonePosition.右腿骨;
        return e;
    }

    public static 天青牛蟒右臂骨(): Bone {
        let e = new Bone();
        e.Name = "天青牛蟒右臂骨";
        e.Position = BonePosition.右臂骨;
        return e;
    }

    public static 深海魔鲸王的躯干骨(): Bone {
        let e = new Bone();
        e.Name = "深海魔鲸王的躯干骨";
        e.Position = BonePosition.躯干骨;
        return e;
    }

    public static 精神凝聚之智慧头骨(): Bone {
        let e = new Bone();
        e.Name = "精神凝聚之智慧头骨";
        e.Position = BonePosition.头骨;
        return e;
    }

    public static 外附魂骨八蛛矛(): Bone {
        let e = new Bone();
        e.Name = "外附魂骨八蛛矛";
        e.EvolutionName = "海神八翼";
        e.Position = BonePosition.外附魂骨;
        return e;
    }

    //独孤博

    public static 万年美杜莎头骨(): Bone {
        let e = new Bone();
        e.Name = "万年美杜莎头骨";
        e.Position = BonePosition.头骨;
        return e;
    }

    //比比东
    public static 六翅紫光翼(): Bone {
        let e = new Bone();
        e.Name = "六翅紫光翼";
        e.Position = BonePosition.外附魂骨;
        return e;
    }

    public static 精神免疫头骨(): Bone {
        let e = new Bone();
        e.Name = "精神免疫头骨";
        e.Position = BonePosition.头骨;
        return e;
    }

    public static 死亡蛛皇左臂骨(): Bone {
        let e = new Bone();
        e.Name = "死亡蛛皇左臂骨";
        e.Position = BonePosition.左臂骨;
        return e;
    }

    public static 死亡蛛皇右臂骨(): Bone {
        let e = new Bone();
        e.Name = "死亡蛛皇右臂骨";
        e.Position = BonePosition.右臂骨;
        return e;
    }

    public static 柔骨兔魂骨(): Bone {
        let e = new Bone();
        e.Name = "柔骨兔魂骨";
        e.Position = BonePosition.躯干骨;
        return e;
    }
}