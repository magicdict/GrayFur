import { character, doubleSoul } from '../Modal/character';
import { SkillCreator } from './SkillCreator';

export class CharacterCreator {
    public static 唐三(): doubleSoul {
        let 唐三 = new doubleSoul("唐三");
        唐三.LV = 1;
        唐三.HP = 100;
        唐三.MaxHP = 100;
        唐三.MP = 20;
        唐三.MaxMP = 20;
        唐三.BaseAct = 10;
        唐三.BaseDef = 10;
        唐三.Speed = 30;
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
        唐三.Skill_A = [
            SkillCreator.缠绕(),
            SkillCreator.寄生(),
            SkillCreator.蛛网束缚_单体(),
            SkillCreator.蛛网束缚_群体(),
            SkillCreator.蓝银囚笼(),
            SkillCreator.蓝银突刺阵(),
            SkillCreator.蓝银霸王枪(),
        ];
        唐三.SecondSkill = ["泰坦之锤/大地之力",
            "大地蚁皇斩", "器魂真身", "千钧壁垒"]

        return 唐三;
    }

    public static 小舞(): character {
        let 小舞 = new character("小舞");
        小舞.LV = 1;
        小舞.HP = 100;
        小舞.MaxHP = 100;
        小舞.MP = 20;
        小舞.MaxMP = 20;
        小舞.BaseAct = 10;
        小舞.BaseDef = 10;
        小舞.Speed = 50;
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
        小舞.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 小舞;
    }

    public static 戴沐白(): character {
        let 戴沐白 = new character("戴沐白");
        戴沐白.LV = 1;
        戴沐白.HP = 100;
        戴沐白.MaxHP = 100;
        戴沐白.MP = 20;
        戴沐白.MaxMP = 20;
        戴沐白.BaseAct = 10;
        戴沐白.BaseDef = 10;
        戴沐白.Speed = 50;
        戴沐白.Soul = "柔骨兔";
        戴沐白.TeamPosition = "敏攻系";
        戴沐白.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        戴沐白.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        戴沐白.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 戴沐白;
    }

    public static 奥斯卡(): character {
        let 奥斯卡 = new character("奥斯卡");
        奥斯卡.LV = 1;
        奥斯卡.HP = 100;
        奥斯卡.MaxHP = 100;
        奥斯卡.MP = 20;
        奥斯卡.MaxMP = 20;
        奥斯卡.BaseAct = 10;
        奥斯卡.BaseDef = 10;
        奥斯卡.Speed = 50;
        奥斯卡.Soul = "柔骨兔";
        奥斯卡.TeamPosition = "敏攻系";
        奥斯卡.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        奥斯卡.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        奥斯卡.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 奥斯卡;
    }

    public static 马红俊(): character {
        let 马红俊 = new character("马红俊");
        马红俊.LV = 1;
        马红俊.HP = 100;
        马红俊.MaxHP = 100;
        马红俊.MP = 20;
        马红俊.MaxMP = 20;
        马红俊.BaseAct = 10;
        马红俊.BaseDef = 10;
        马红俊.Speed = 50;
        马红俊.Soul = "柔骨兔";
        马红俊.TeamPosition = "敏攻系";
        马红俊.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        马红俊.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        马红俊.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 马红俊;
    }

    public static 宁荣荣(): character {
        let 宁荣荣 = new character("宁荣荣");
        宁荣荣.LV = 1;
        宁荣荣.HP = 100;
        宁荣荣.MaxHP = 100;
        宁荣荣.MP = 20;
        宁荣荣.MaxMP = 20;
        宁荣荣.BaseAct = 10;
        宁荣荣.BaseDef = 10;
        宁荣荣.Speed = 50;
        宁荣荣.Soul = "柔骨兔";
        宁荣荣.TeamPosition = "敏攻系";
        宁荣荣.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        宁荣荣.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        宁荣荣.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 宁荣荣;
    }

    public static 朱竹清(): character {
        let 朱竹清 = new character("朱竹清");
        朱竹清.LV = 1;
        朱竹清.HP = 100;
        朱竹清.MaxHP = 100;
        朱竹清.MP = 20;
        朱竹清.MaxMP = 20;
        朱竹清.BaseAct = 10;
        朱竹清.BaseDef = 10;
        朱竹清.Speed = 50;
        朱竹清.Soul = "柔骨兔";
        朱竹清.TeamPosition = "敏攻系";
        朱竹清.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        朱竹清.Skill = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        朱竹清.Skill_A = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
        ]
        return 朱竹清;
    }

    public static 赵无极(): character {
        let 赵无极 = new character("赵无极");
        赵无极.LV = 65;
        赵无极.HP = 1000;
        赵无极.MaxHP = 1000;
        赵无极.MP = 200;
        赵无极.MaxMP = 200;
        赵无极.BaseAct = 100;
        赵无极.BaseDef = 100;
        赵无极.Speed = 10;
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
        赵无极.Skill_A = [
            SkillCreator.不动明王身(),
        ];
        赵无极.AI = (role,status) => {
            //初级阶段,对前排的一个活人进行普通攻击
            status.MyTeam.some(element => {
                if (element !== undefined && element.HP > 0) {
                    element.HP -= status.NornamAct(role, element);
                    if (element.HP <= 0) element.HP = 0;
                    return true;
                }
            });
        }
        return 赵无极;
    }
}