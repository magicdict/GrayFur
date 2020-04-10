import { SkillInfo, BufferStatusSkillInfo, enmDirect, enmRange, AttactSkillInfo } from '../Modal/SkillInfo';

export class CombineSkillCreator {

    public static 双神共存(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "双神共存";
        s.Description = "成就独一无二的完美武魂融合技，是神级的融合。";
        s.Combine = ["唐三", "小舞"];
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }

    public static 复活之光(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "复活之光";
        s.Description = "起死回生";
        s.Combine = ["宁荣荣", "奥斯卡"];
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }

    public static 幽冥白虎_0(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥白虎";
        s.Description = "幽冥白虎";
        s.Combine = ["戴沐白", "朱竹清"];
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 500;
        return s;
    }

    public static 幽冥白虎_1(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥白虎";
        s.Description = "幽冥白虎";
        s.Combine = ["戴维斯", "朱竹云"];
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 500;
        return s;
    }

    public static 光明圣龙(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "光明圣龙";
        s.Description = "光明圣龙";
        s.Combine = ["玉小刚", "柳二龙", "弗兰德"];
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }
}