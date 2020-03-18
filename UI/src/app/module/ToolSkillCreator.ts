import { SkillInfo, enmDirect, enmRange, HealSkillInfo } from '../Modal/SkillInfo';
import { ToolInfo } from '../Modal/ToolInfo';

export class ToolSkillCreator {

    public static 止血草(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "止血草";
        t.Func = ToolSkillCreator.生命值小回复();
        t.Price = 1;
        return t;
    }

    public static 小烤肠(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小烤肠";
        t.Func = ToolSkillCreator.魂力小回复();
        t.Price = 1;
        return t;
    }

    public static 小黑瓶(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小黑瓶";
        t.Func = ToolSkillCreator.生命值魂力小回复();
        t.Price = 15;
        return t;
    }

    /**生命值小回复 */
    private static 生命值小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "生命值小回复";
        s.Description = "单体，回复50生命值";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverHP = 50;
        return s;
    }

    /**魂力小回复 */
    private static 魂力小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "魂力小回复";
        s.Description = "单体，回复10魂力";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverMP = 10;
        return s;
    }

    /**生命值魂力小回复 */
    private static 生命值魂力小回复(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "生命值魂力小回复";
        s.Description = "单体，回复50生命值和10魂力";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.PickOne;
        s.RecoverMP = 10;
        return s;
    }

}