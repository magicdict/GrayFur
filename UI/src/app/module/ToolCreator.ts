import { ToolInfo } from '../Modal/ToolInfo';
import { SkillCreator } from './SkillCreator';

export class ToolCreator {

    public static 止血草(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "止血草";
        t.Func = SkillCreator.生命值小回复();
        t.Price = 1;
        return t;
    }

    public static 小烤肠(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小烤肠";
        t.Func = SkillCreator.魂力小回复();
        t.Price = 1;
        return t;
    }

    public static 小黑瓶(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小黑瓶";
        t.Func = SkillCreator.生命值魂力小回复();
        t.Price = 15;
        return t;
    }

}