import { SkillInfo, enmRange, enmDirect, AttactSkillInfo, HealSkillInfo, BufferStatusSkillInfo } from '../Modal/SkillInfo';
import { characterStatus } from '../Modal/Character';
import { ToolSkillCreator } from './ToolSkill';

export class CircleSkillCreator {

    //戴沐白
    public static 白虎护身障(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "白虎护身障";
        s.Description = "攻击、防御、力量增强50%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.AttactFactor = 0.5;
        s.Buffer.DefenceFactor = 0.5;
        s.Buffer.MaxHPFactor = 0.5;
        s.Buffer.Status = [characterStatus.攻击增益, characterStatus.防御增益, characterStatus.生命增益];
        return s;
    }

    public static 白虎烈光波(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "白虎烈光波";
        s.Description = "发出白色的光波进行攻击";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 白虎金刚变(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "白虎金刚变";
        s.Description = "攻击、防御、力量增强100%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.AttactFactor = 1;
        s.Buffer.DefenceFactor = 1;
        s.Buffer.MaxHPFactor = 1;
        s.Buffer.Status = [characterStatus.攻击增益, characterStatus.防御增益, characterStatus.生命增益];
        return s;
    }

    public static 白虎流星雨(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "白虎流星雨";
        s.Description = "发出无数拳头大小的金色光球进行攻击";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        return s;
    }

    //奥斯卡
    public static 超级恢复大香肠(): SkillInfo {
        let s = ToolSkillCreator.生命值魂力小回复();
        s.Name = "超级恢复大香肠";
        s.Range = enmRange.EveryOne;
        return s;
    }


    //唐三
    public static 缠绕(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "缠绕";
        s.Description = "单体限制，使用蓝银皇缠住敌人";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 1;
        s.Buffer.Status = [characterStatus.束缚];
        return s;
    }

    public static 寄生(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "寄生";
        s.Description = "单体限制，蓝银皇在敌人体内留下的种子萌发";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.束缚];

        return s;
    }

    public static 蛛网束缚_单体(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蛛网束缚(单体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.束缚];
        return s;
    }

    public static 蛛网束缚_群体(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蛛网束缚(群体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Buffer.Turns = 1;
        s.Buffer.Status = [characterStatus.束缚];
        s.ColdDownTurn = 3;
        return s;
    }

    public static 蓝银囚笼(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蓝银囚笼";
        s.Description = "群体限制，蓝银皇化为囚笼困住敌人";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.束缚];
        s.ColdDownTurn = 3;
        return s;
    }

    public static 蓝银突刺阵(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蓝银突刺阵";
        s.Description = "群体限制，强制眩晕一秒";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Buffer.Turns = 1;
        s.Buffer.Status = [characterStatus.束缚];
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
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        return s;
    }

    public static 泰坦之锤(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "泰坦之锤";
        s.Description = "强攻之技，其威力甚至超越了大须弥锤的炸环，但需要蓄力时间而无法连续使用";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.ColdDownTurn = 5;
        s.Harm = 500;
        return s;
    }

    public static 大地之力(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "大地之力";
        s.Description = "控制大地的力量为自己所用";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.ColdDownTurn = 5;
        s.Harm = 500;
        return s;
    }

    public static 大地蚁皇斩(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "大地蚁皇斩";
        s.Description = "强攻之技，其威力甚至超越了大须弥锤的炸环，但需要蓄力时间而无法连续使用";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.ColdDownTurn = 5;
        s.Harm = 500;
        return s;
    }

    public static 千钧壁垒(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "千钧壁垒";
        s.Description = "强攻之技，其威力甚至超越了大须弥锤的炸环，但需要蓄力时间而无法连续使用";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.ColdDownTurn = 5;
        s.Harm = 500;
        return s;
    }

    //小舞
    public static 腰弓(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "腰弓";
        s.Description = "柔术";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 魅惑(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "魅惑";
        s.Description = "双眼放射诱惑人的粉红光，令人眩晕";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.束缚];
        return s;
    }

    public static 虚无(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "虚无";
        s.Description = "不会受到攻击，免疫物体、能量等一切防御。";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.无敌];
        return s;
    }

    public static 爆杀八段摔(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "爆杀八段摔";
        s.Description = "最狂暴的一种摔法，只要被摔出第一下，就没有反抗的可能，每一下都附带眩晕效果";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 1000;
        return s;
    }

    //马红俊
    public static 凤凰火线(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "凤凰火线";
        s.Description = "从口中喷出一道火焰，单向远程攻击技";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        s.CustomeExcute = (c, fs) => {
            if (fs.currentActionCharater.StatusList.find(x => x === characterStatus.浴火凤凰) !== undefined) {
                c.HP -= s.Harm * 1.3;
                if (c.HP <= 0) c.HP = 0;
            } else {
                c.HP -= s.Harm;
                if (c.HP <= 0) c.HP = 0;
            }
            return true;
        }
        return s;
    }

    public static 浴火凤凰(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "浴火凤凰";
        s.Description = "开启时凤凰火焰增强30%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.Turns = 999;
        s.Buffer.Status = [characterStatus.浴火凤凰];
        return s;
    }

    //宁荣荣

    /**力量增益 */
    public static 力量增益(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "力量增益";
        s.Description = "我方全体生命值上限增加10%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxHPFactor = 0.1;
        s.Buffer.Status = [characterStatus.生命增益];
        s.EffectWithLevel = true;
        return s;
    }

    /**敏捷增幅 */
    public static 敏捷增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "敏捷增幅";
        s.Description = "我方全体速度上限增加10%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.SpeedFactor = 0.1;
        s.Buffer.Status = [characterStatus.速度增益];
        s.EffectWithLevel = true;
        return s;
    }

    /**魂力增幅 */
    public static 魂力增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "魂力增幅";
        s.Description = "我方全体魂力上限增加10%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.MaxMPFactor = 0.1;
        s.Buffer.Status = [characterStatus.魂力增益];
        s.EffectWithLevel = true;
        return s;
    }

    /**防御增幅 */
    public static 防御增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "防御增幅";
        s.Description = "我方全体防御力上限增加10%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.DefenceFactor = 0.1;
        s.Buffer.Status = [characterStatus.防御增益];
        s.EffectWithLevel = true;
        return s;
    }

    /**攻击增幅 */
    public static 攻击增幅(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "攻击增幅";
        s.Description = "我方全体攻击力上限增加10%";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.Buffer.AttactFactor = 0.1;
        s.Buffer.Status = [characterStatus.攻击增益];
        s.EffectWithLevel = true;
        s.ColdDownTurn = 5;
        return s;
    }

    //朱竹清
    public static 幽冥突刺(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥突刺";
        s.Description = "迅速用利爪刺杀对方，近身单体攻击技";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 幽冥百爪(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥百爪";
        s.Description = "透点式攻击，百爪攻击同一点，速度极快，破坏力强，近身单体攻击技";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 100;
        return s;
    }

    public static 幽冥斩(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "幽冥斩";
        s.Description = "魂力覆盖双手的同时高举并合掌，然后由上往下攻击，攻击时，覆盖双手的魂力会随着双手的移动轨迹形成一个月牙状的黑影斩向对方，破坏力极大，近身单体攻击技";
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
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.Turns = 3;
        s.Buffer.DefenceFactor = 1;
        s.Buffer.Status = [characterStatus.防御增益];
        return s;
    }

    public static 大力金刚掌(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "大力金刚掌";
        s.Description = "大力金刚掌";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 200;
        return s;
    }

    public static 重力增强(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "重力增强";
        s.Description = "重力增强";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.SpeedFactor = -0.2;
        s.Buffer.AttactFactor = -0.2;
        s.Buffer.DefenceFactor = -0.2;
        s.Buffer.Status = [characterStatus.攻击增益, characterStatus.速度增益, characterStatus.防御增益];
        s.Buffer.Source = s.Name;
        return s;
    }


    public static 重力挤压(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "重力增强";
        s.Description = "重力增强";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.SpeedFactor = -0.5;
        s.Buffer.AttactFactor = -0.5;
        s.Buffer.DefenceFactor = -0.5;
        s.Buffer.Status = [characterStatus.攻击增益, characterStatus.速度增益, characterStatus.防御增益];
        s.Buffer.Source = s.Name;
        return s;
    }


    public static 大力金刚吼(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "大力金刚吼";
        s.Description = "大力金刚吼";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Harm = 1000;
        return s;
    }

    //玉小刚
    public static 放屁如打雷_轰天裂地罗三炮(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "放屁如打雷_轰天裂地罗三炮";
        s.Description = "放屁如打雷_轰天裂地罗三炮";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    public static 放屁如烟雾_催眠沉睡罗三炮(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "放屁如烟雾_催眠沉睡罗三炮";
        s.Description = "放屁如烟雾_催眠沉睡罗三炮";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 50;
        return s;
    }

    //独孤雁

    public static 碧磷红毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷红毒";
        s.Description = "亢奋之毒（刺激神经，攻击力、速度增加20%）";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.SpeedFactor = 0.2;
        s.Buffer.AttactFactor = 0.2;
        s.Buffer.Status = [characterStatus.攻击增益, characterStatus.速度增益];
        s.Buffer.Source = s.Name;
        return s;
    }

    public static 碧磷蓝毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷蓝毒";
        s.Description = "麻痹之毒（消除痛感，防御力增加30%）";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.DefenceFactor = 0.3;
        s.Buffer.Status = [characterStatus.防御增益];
        s.Buffer.Source = s.Name;
        return s;
    }

    public static 碧磷紫毒(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷紫毒";
        s.Description = "碧磷紫毒（每回合损失5%生命力，持续3回合）";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.HPFactor = -0.05;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.中毒];
        s.Buffer.Source = s.Name;
        return s;
    }

    //独孤博
    public static 碧磷迷魂阵(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "碧磷迷魂阵";
        s.Description = "碧磷紫毒（每回合损失5%生命力，持续3回合）";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.HPFactor = -0.05;
        s.Buffer.Turns = 3;
        s.Buffer.Status = [characterStatus.中毒, characterStatus.束缚];
        s.Buffer.Source = s.Name;
        return s;
    }

    public static 蛇蟒天罡盾(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "蛇蟒天罡盾";
        s.Description = "碧磷紫毒（每回合损失5%生命力，持续3回合）";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Buffer.HPFactor = -0.05;
        s.Buffer.Turns = 3;
        s.Buffer.DefenceFactor = 1;
        s.Buffer.Source = s.Name;
        return s;
    }



    //叶泠泠 魂技

    public static 范围性全体治疗(): SkillInfo {
        let s = new HealSkillInfo();
        s.Name = "范围性全体治疗";
        s.Description = "范围性全体治疗";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.EveryOne;
        s.RecoverHPPercent = 0.1;
        s.EffectWithLevel = true;  //和施法者等级挂钩
        return s;
    }


    //防御功能
    public static 防御(): SkillInfo {
        let s = new BufferStatusSkillInfo();
        s.Name = "防御";
        s.Description = "防御";
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Buffer.DefenceFactor = 1;
        s.Buffer.Turns = 1;
        s.Buffer.Status = [characterStatus.防御增益];
        return s;
    }
}