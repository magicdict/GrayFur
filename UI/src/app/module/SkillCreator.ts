import { SkillInfo, BlockSkillInfo, DefenceSkillInfo,enmRange, enmDirect, enmSkillType, AttactSkillInfo } from '../Modal/SkillInfo';

export class SkillCreator {
    //唐三
    public static 缠绕(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "缠绕";
        s.Description = "单体限制，使用蓝银皇缠住敌人";
        s.Order = 1;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Turns = 1;
        s.BlockAttact = true;
        s.BlockSkill = false;
        s.Source = "曼陀罗蛇";
        return s;
    }

    public static 寄生(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "寄生";
        s.Description = "单体限制，蓝银皇在敌人体内留下的种子萌发";
        s.Order = 2;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Turns = 2;
        s.BlockAttact = true;
        s.BlockSkill = false;
        s.Source = "鬼藤";
        return s;
    }

    public static 蛛网束缚_单体(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "蛛网束缚(单体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Order = 3;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Turns = 3;
        s.BlockAttact = true;
        s.BlockSkill = false;
        s.Source = "人面魔蛛";
        return s;
    }

    public static 蛛网束缚_群体(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "蛛网束缚(群体)";
        s.Description = "限制性技能，可单体，可群体，蓝银皇凝聚制成的蛛网，捆绑对手";
        s.Order = 3;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Turns = 1;
        s.BlockAttact = true;
        s.BlockSkill = false;
        s.Source = "人面魔蛛";
        return s;
    }

    public static 蓝银囚笼(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "蓝银囚笼";
        s.Description = "群体限制，蓝银皇化为囚笼困住敌人";
        s.Order = 4;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Turns = 2;
        s.BlockAttact = true;
        s.BlockSkill = false;
        s.Source = "地穴魔蛛";
        return s;
    }

    public static 蓝银突刺阵(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "蓝银突刺阵";
        s.Description = "群体限制，强制眩晕一秒";
        s.Order = 4;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Turns = 1;
        s.BlockAttact = true;
        s.BlockSkill = true;
        s.Source = "地穴魔蛛";
        return s;
    }

    public static 蓝银霸王枪(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "蓝银霸王枪";
        s.Description = "单体攻击，凝聚一点，蓝银皇武魂攻击最强魂技";
        s.Order = 5;
        s.SkillType = enmSkillType.Attact;
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
        s.SkillType = enmSkillType.Attact;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Harm = 100;
        return s;
    } 
    
    public static 魅惑(): SkillInfo {
        let s = new BlockSkillInfo();
        s.Name = "魅惑";
        s.Description = "双眼放射诱惑人的粉红光，令人眩晕";
        s.Order = 2;
        s.SkillType = enmSkillType.Block;
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Turns = 2;
        s.BlockAttact = true;
        s.BlockSkill = true;
        return s;
    }

    //赵无极
    public static 不动明王身(): SkillInfo {
        let s = new DefenceSkillInfo();
        s.Name = "不动明王身";
        s.Description = "防御极强，面对唐三纯熟的唐门暗器，铿铿锵锵，火花四溅，并不能伤及他分毫。";
        s.Order = 1;
        s.SkillType = enmSkillType.Defence;
        s.Direct = enmDirect.MyTeam;
        s.Range = enmRange.Self;
        s.Turns = 1;
        return s;
    } 
}