import { character, doubleSoul } from './character';

export class CharacterCreator {
    public static 唐三(): doubleSoul {
        let 唐三 = new doubleSoul("唐三");
        唐三.LV = 1;
        唐三.HP = 100;
        唐三.MaxHP = 100;
        唐三.MP = 20;
        唐三.MaxMP = 20;
        唐三.Soul = "蓝银皇";
        唐三.SecondSoul = "昊天锤";
        唐三.TeamPosition = "控制系";
        唐三.Description = "唐三前世为巴蜀唐门外门子弟，来到斗罗大陆后与伙伴们一起在异界大陆重新建立了唐门。"
        唐三.Skill = ["缠绕",
            "寄生",
            "蛛网束缚",
            "蓝银囚笼/蓝银突刺阵",
            "蓝银霸皇枪",
            "虚无状态/暴杀八段摔",
            "蓝银真身",
            "蓝银虎鲸镜之灭/蓝银虎鲸魔之摄",
            "蓝银天青龙之魂",
            "海神神环"];
        唐三.SecondSkill = ["泰坦之锤/大地之力", 
                           "大地蚁皇斩","器魂真身","千钧壁垒"]

        return 唐三;
    }

    public static 小舞(): character {
        let 小舞 = new character("小舞");
        小舞.LV = 1;
        小舞.HP = 100;
        小舞.MaxHP = 100;
        小舞.MP = 20;
        小舞.MaxMP = 20;
        小舞.Soul = "柔骨兔";
        小舞.TeamPosition = "敏攻系";
        小舞.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        小舞.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        return 小舞;
    }

    public static 赵无极(): character {
        let 赵无极 = new character("赵无极");
        赵无极.LV = 65;
        赵无极.HP = 1000;
        赵无极.MaxHP = 1000;
        赵无极.MP = 200;
        赵无极.MaxMP = 200;
        赵无极.Soul = "大力金刚熊";
        赵无极.TeamPosition = "强攻系";
        赵无极.Description = "人称不动明王，防御力惊人，曾经风靡一时的狠辣角色，后来到史莱克学院当老师。虽外表凶狠，但内心善良，且十分护短，非常喜爱史莱克七怪。"
        赵无极.Skill = [
            "不动明王身",
            "大力金刚掌",
            "重力增强",
            "定位追踪",
            "重力挤压",
            "大力金刚吼",
            "武魂真身"];
        return 赵无极;
    }
}