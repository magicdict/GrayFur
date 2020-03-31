import { ToolInfo } from '../Modal/ToolInfo';
import { SkillCreator } from './SkillCreator';
import { IconMgr } from '../Core/IconMgr';


export class ToolCreator {
    public static 止血草(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "止血草";
        t.Icon = IconMgr.icon_hp_small;
        t.Func = SkillCreator.生命值小回复();
        t.Price = 1;
        return t;
    }

    public static 小烤肠(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小烤肠";
        t.Icon = IconMgr.icon_mp_small;
        t.Func = SkillCreator.魂力小回复();
        t.Price = 1;
        return t;
    }

    public static 小橙瓶(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小橙瓶";
        t.Icon = IconMgr.icon_mix_small;
        t.Func = SkillCreator.生命值魂力小回复();
        t.Price = 15;
        return t;
    }
}