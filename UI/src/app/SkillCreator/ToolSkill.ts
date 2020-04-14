import { SkillInfo, HealSkillInfo, enmDirect, enmRange, AttactSkillInfo } from '../Modal/SkillInfo';

export class ToolSkillCreator {
    //道具

    /**生命值小回复 */
    public static 生命值小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "生命值小回复";
        s.Description = "单体，回复50生命值";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverHP = 50;
        return s;
    }

    /**魂力小回复 */
    public static 魂力小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "魂力小回复";
        s.Description = "单体，回复10魂力";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverMP = 10;
        return s;
    }

    /**生命值魂力小回复 */
    public static 生命值魂力小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "生命值魂力小回复";
        s.Description = "单体，回复50生命值和10魂力";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverMP = 10;
        s.RecoverHP = 50;
        return s;
    }

    //暗器
    public static 观音泪(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "观音泪";
        s.Description = "唐门至尊级巅峰暗器，伤害范围极广，威力极大。";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 9800;
        return s;
    }

    public static 菩提血(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "菩提血";
        s.Description = "唐门至尊级巅峰暗器，伤害范围极广，威力极大。";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 8800;
        return s;
    }

    public static 阎王帖(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "阎王帖";
        s.Description = "唐门至尊级巅峰暗器，伤害范围极广，威力极大。";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 9999;
        return s;
    }


    public static 佛怒唐莲(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "佛怒唐莲";
        s.Description = "唐门至尊级巅峰暗器，伤害范围极广，威力极大。";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Harm = 9999;
        return s;
    }
}