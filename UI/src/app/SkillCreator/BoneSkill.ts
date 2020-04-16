import { SkillInfo, AttactSkillInfo, BufferStatusSkillInfo } from '../Modal/SkillInfo';
import { enmDirect, enmRange } from '../Modal/EnumAndConst';
import { characterStatus } from '../Modal/Character';

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

    //强化
    public static 强化(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "强化";
        s.Description = "强化";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.HPFactor = 0.5;
        s.Buffer.MPFactor = 0.5;
        s.Buffer.AttactFactor = 0.5;
        s.Buffer.DefenceFactor = 0.5;
        s.Buffer.SpeedFactor = 0.5;
        s.Buffer.Turns = 5;
        s.Buffer.Status = [characterStatus.生命增益, characterStatus.魂力增益, characterStatus.攻击增益, characterStatus.防御增益, characterStatus.速度增益];
        return s;
    }
}