import { SkillInfo, enmRange, enmDirect, AttactSkillInfo, HealSkillInfo, BufferStatusSkillInfo } from '../Modal/SkillInfo';
import { characterStatus } from '../Modal/character';

export class SkillCreator {

    //戴沐白
    public static 白虎护身障(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "白虎护身障";
        s.Description = "攻击、防御、力量增强50%";
        s.Order = 1;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.AttactFactor = 0.5;
        s.Buffer.DefenceFactor = 0.5;
        s.Buffer.MaxHPFactor = 0.5;
        return s;
    }

    public static 白虎烈光波(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "白虎烈光波";
        s.Description = "发出白色的光波进行攻击";
        s.Order = 2;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 白虎金刚变(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "白虎金刚变";
        s.Description = "攻击、防御、力量增强100%";
        s.Order = 3;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.AttactFactor = 1;
        s.Buffer.DefenceFactor = 1;
        s.Buffer.MaxHPFactor = 1;
        return s;
    }

    public static 白虎流星雨(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "白虎流星雨";
        s.Description = "发出无数拳头大小的金色光球进行攻击";
        s.Order = 4;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        return s;
    }

    //奥斯卡

    public static 超级恢复大香肠(): SkillInfo {
        let s = this.生命值魂力小回复();
        s.Name = "超级恢复大香肠";
        s.Order = 3;
        s.Range = enmRange.EveryOne;
        return s;
    }


    //唐三
    public static 缠绕(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "缠绕";
        s.Description = "单体限制，使用蓝银皇缠住敌人";
        s.Order = 1;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Source = "曼陀罗蛇";
        s.Buffer.Turns = 1;
        s.Buffer.Status = characterStatus.束缚;
        return s;
    }

    public static 寄生(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "寄生";
        s.Description = "单体限制，蓝银皇在敌人体内留下的种子萌发";
        s.Order = 2;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Source = "鬼藤";
        s.Buffer.Turns = 3;
        s.Buffer.Status = characterStatus.束缚;
        return s;
    }

    public static 蛛网束缚_单体(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蛛网束缚(单体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Order = 3;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = characterStatus.晕眩;
        s.Source = "人面魔蛛";
        return s;
    }

    public static 蛛网束缚_群体(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蛛网束缚(群体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Order = 3;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Buffer.Turns = 1;
        s.Buffer.Status = characterStatus.晕眩;
        s.Source = "人面魔蛛";
        return s;
    }

    public static 蓝银囚笼(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蓝银囚笼";
        s.Description = "群体限制，蓝银皇化为囚笼困住敌人";
        s.Order = 4;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Source = "地穴魔蛛";
        s.Buffer.Turns = 3;
        s.Buffer.Status = characterStatus.晕眩;
        return s;
    }

    public static 蓝银突刺阵(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蓝银突刺阵";
        s.Description = "群体限制，强制眩晕一秒";
        s.Order = 4;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Source = "地穴魔蛛";
        s.Buffer.Turns = 1;
        s.Buffer.Status = characterStatus.晕眩;

        //增加攻击性
        let a = new AttactSkillInfo();
        a.Name = "蓝银突刺阵附加攻击"
        a.Harm = 20;
        s.AddtionSkill = a;
        return s;
    }

    public static 蓝银霸王枪(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "蓝银霸王枪";
        s.Description = "单体攻击，凝聚一点，蓝银皇武魂攻击最强魂技";
        s.Order = 5;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        s.Source = "蓝银皇天赋魂环";
        return s;
    }

    //小舞
    public static 腰弓(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "腰弓";
        s.Description = "柔术";
        s.Order = 1;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 魅惑(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "魅惑";
        s.Description = "双眼放射诱惑人的粉红光，令人眩晕";
        s.Order = 2;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = characterStatus.晕眩;
        return s;
    }

    //马红俊
    public static 凤凰火线(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "凤凰火线";
        s.Description = "从口中喷出一道火焰，单向远程攻击技";
        s.Order = 1;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.CustomeExcute = (c, fs) => {
            if (fs.currentActionCharater.BufferStatusList.find(x => x[0] === characterStatus.浴火凤凰) !== undefined) {
                c.HP -= 50 * 1.3;
                if (c.HP <= 0) c.HP = 0;
            } else {
                c.HP -= 50;
                if (c.HP <= 0) c.HP = 0;
            }
            return true;
        }
        s.Harm = 50;
        return s;
    }

    public static 浴火凤凰(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "浴火凤凰";
        s.Description = "开启时凤凰火焰增强30%";
        s.Order = 1;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.Turns = 999;
        s.Buffer.Status = characterStatus.浴火凤凰;
        return s;
    }

    //宁荣荣

    /**力量增益 */
    public static 力量增益(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "力量增益";
        s.Description = "我方全体生命值上限增加10%";
        s.Order = 1;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        s.BufferFactorByLV = true;
        return s;
    }

    /**敏捷增幅 */
    public static 敏捷增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "敏捷增幅";
        s.Description = "我方全体速度上限增加10%";
        s.Order = 2;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.SpeedFactor = 0.1;
        s.BufferFactorByLV = true;
        return s;
    }

    /**魂力增幅 */
    public static 魂力增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "魂力增幅";
        s.Description = "我方全体魂力上限增加10%";
        s.Order = 3;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxMPFactor = 0.1;
        s.BufferFactorByLV = true;
        return s;
    }

    /**防御增幅 */
    public static 防御增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "防御增幅";
        s.Description = "我方全体防御力上限增加10%";
        s.Order = 4;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.DefenceFactor = 0.1;
        s.BufferFactorByLV = true;
        return s;
    }

    /**攻击增幅 */
    public static 攻击增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "攻击增幅";
        s.Description = "我方全体攻击力上限增加10%";
        s.Order = 5;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.AttactFactor = 0.1;
        s.BufferFactorByLV = true;
        return s;
    }

    //朱竹清
    public static 幽冥突刺(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥突刺";
        s.Description = "迅速用利爪刺杀对方，近身单体攻击技";
        s.Order = 1;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 幽冥百爪(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥百爪";
        s.Description = "透点式攻击，百爪攻击同一点，速度极快，破坏力强，近身单体攻击技";
        s.Order = 2;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        return s;
    }

    public static 幽冥斩(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥斩";
        s.Description = "魂力覆盖双手的同时高举并合掌，然后由上往下攻击，攻击时，覆盖双手的魂力会随着双手的移动轨迹形成一个月牙状的黑影斩向对方，破坏力极大，近身单体攻击技";
        s.Order = 3;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 200;
        return s;
    }

    //赵无极
    public static 不动明王身(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "不动明王身";
        s.Description = "防御极强，面对唐三纯熟的唐门暗器，铿铿锵锵，火花四溅，并不能伤及他分毫。";
        s.Order = 1;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.DefenceFactor = 1;
        return s;
    }

    //独孤雁

    public static 碧磷红毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷红毒";
        s.Description = "亢奋之毒（刺激神经，攻击力、速度增加20%）";
        s.Order = 1;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.SpeedFactor = 0.2;
        s.Buffer.AttactFactor = 0.2;
        s.Buffer.Source = s.Name;
        return s;
    }

    public static 碧磷蓝毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷蓝毒";
        s.Description = "麻痹之毒（消除痛感，防御力增加30%）";
        s.Order = 2;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.DefenceFactor = 0.3;
        s.Buffer.Source = s.Name;
        return s;
    }

    public static 碧磷紫毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷紫毒";
        s.Description = "碧磷紫毒（每回合损失5%生命力，持续3回合）";
        s.Order = 3;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.HPFactor = -0.05;
        s.Buffer.Turns = 3;
        s.Buffer.Status = characterStatus.中毒;
        s.Buffer.Source = s.Name;
        return s;
    }

    //武魂融合

    public static 双神共存(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "双神共存";
        s.Description = "成就独一无二的完美武魂融合技，是神级的融合。";
        s.Combine = ["唐三", "小舞"];
        s.Order = 10;
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
        s.Order = 10;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }

    public static 幽冥白虎(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "幽冥白虎";
        s.Description = "幽冥白虎";
        s.Combine = ["戴沐白", "朱竹清"];
        s.Order = 10;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }

    public static 光明圣龙(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "光明圣龙";
        s.Description = "光明圣龙";
        s.Combine = ["玉小刚", "柳二龙", "弗兰德"];
        s.Order = 10;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        return s;
    }

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
}