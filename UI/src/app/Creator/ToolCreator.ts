import { ToolInfo, enmToolType } from '../Modal/ToolInfo';
import { SkillCreator } from './SkillCreator';
import { ResourceMgr } from '../Core/ResourceMgr';


export class ToolCreator {
    public static 止血草(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "止血草";
        t.Icon = ResourceMgr.icon_hp_small;
        t.Func = SkillCreator.生命值小回复();
        t.Price = 1;
        return t;
    }

    public static 小烤肠(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小烤肠";
        t.Icon = ResourceMgr.icon_mp_small;
        t.Func = SkillCreator.魂力小回复();
        t.Price = 1;
        return t;
    }

    public static 小橙瓶(): ToolInfo {
        let t = new ToolInfo();
        t.Name = "小橙瓶";
        t.Icon = ResourceMgr.icon_mix_small;
        t.Func = SkillCreator.生命值魂力小回复();
        t.Price = 15;
        return t;
    }

    public static 观音泪(): ToolInfo {
        let t = new ToolInfo();
        t.ToolType = enmToolType.HiddenWeapon;
        t.Name = "观音泪";
        t.Icon = ResourceMgr.icon_attact;
        t.Func = SkillCreator.观音泪();
        t.Price = 99;
        return t;
    }
    public static 菩提血(): ToolInfo {
        let t = new ToolInfo();
        t.ToolType = enmToolType.HiddenWeapon;
        t.Name = "菩提血";
        t.Icon = ResourceMgr.icon_attact;
        t.Func = SkillCreator.菩提血();
        t.Price = 999;
        return t;
    }
    public static 阎王帖(): ToolInfo {
        let t = new ToolInfo();
        t.ToolType = enmToolType.HiddenWeapon;
        t.Name = "阎王帖";
        t.Icon = ResourceMgr.icon_attact;
        t.Func = SkillCreator.阎王帖();
        t.Price = 9999;
        return t;
    }
    public static 佛怒唐莲(): ToolInfo {
        let t = new ToolInfo();
        t.ToolType = enmToolType.HiddenWeapon;
        t.Name = "佛怒唐莲";
        t.Icon = ResourceMgr.icon_attact;
        t.Func = SkillCreator.佛怒唐莲();
        t.Price = 99999;
        return t;
    }
}