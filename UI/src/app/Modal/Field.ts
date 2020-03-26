import { SkillInfo } from './SkillInfo';
/**领域 */
export class Field {
    Name: string;
    Descirption: string;
    Skill: SkillInfo;
}

export class FieldCreator {
    public static 两极静止领域(): Field {
        let f = new Field();
        f.Name = "两极静止领域";
        return f;
    }

    public static 蓝银领域(): Field {
        let f = new Field();
        f.Name = "蓝银领域";
        f.Descirption = "与外界蓝银草产生共鸣，短时间内把领域里的蓝银草变成蓝银皇为自己所用，大幅度提升战斗力，隔绝一定不良状态，控制领域范围内的所有蓝银草使用技能以领域为媒，在领域范围内可配合精神力探查周围的信息。";
        return f;
    }

    public static 海神领域(): Field {
        let f = new Field();
        f.Name = "海神领域";
        f.Descirption = "传承海神获得，通过凝聚海神领域来获得大海的力量，补充自己的魂力。";
        return f;
    }

    public static 杀神领域(): Field {
        let f = new Field();
        f.Name = "杀神领域";
        f.Descirption = "增加气势，削弱对方实力，杀气形成的气势和压力往往能够让你的对手无法发挥出全部实力，而你自己却可以发挥到百分之一百二的程度，可增幅他人。";
        return f;
    }

    public static 修罗领域(): Field {
        let f = new Field();
        f.Name = "修罗领域";
        f.Descirption = "修罗神状态下使用，杀神领域的神级进化，但已经不再是杀神领域，而是全新的领域，修罗神的领域：修罗领域。";
        return f;
    }

    public static 天使领域(): Field {
        let f = new Field();
        f.Name = "天使领域";
        return f;
    }
}