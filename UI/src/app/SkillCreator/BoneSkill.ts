import { SkillInfo, AttactSkillInfo, enmDirect, enmRange } from '../Modal/SkillInfo';

export class BoneSkillCreator {

    //邪魔虎鲸王左腿骨
    public static 虎鲸邪魔斧(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "虎鲸邪魔斧";
        s.Description = "完全作用于攻击，凝全身功力于左腿，经魂骨增幅，化为薄如蝉翼的战斧利刃，直线型单体攻击";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 5000;
        return s;
    }

    public static 虎鲸碎牙斩(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "虎鲸碎牙斩";
        s.Description = "群攻技能";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Harm = 2000;
        return s;
    }
}