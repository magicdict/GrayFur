import { character, doubleSoul } from '../Modal/character';
import { SkillCreator } from './SkillCreator';
import { EquipmentCreator } from '../Modal/Equipment';

export class CharacterCreator {
    public static 唐三(): doubleSoul {
        let 唐三 = new doubleSoul("唐三");
        唐三.LV = 1;
        唐三.HP = 100;
        唐三.BaseMaxHP = 100;
        唐三.MP = 20;
        唐三.BaseMaxMP = 20;
        唐三.BaseAct = 10;
        唐三.BaseDef = 10;
        唐三.BaseSpeed = 30;
        唐三.Bones = [
            EquipmentCreator.外附魂骨八蛛矛(),
            EquipmentCreator.天青牛蟒右臂骨(),
            EquipmentCreator.泰坦巨猿左臂骨(),
            EquipmentCreator.深海魔鲸王的躯干骨(),
            EquipmentCreator.精神凝聚之智慧头骨(),
            EquipmentCreator.蓝银皇右腿骨(),
            EquipmentCreator.邪魔虎鲸王左腿骨()
        ]
        唐三.Soul = "蓝银皇";
        唐三.SecondSoul = "昊天锤";
        唐三.TeamPosition = "控制系";
        唐三.Description = "唐三前世为巴蜀唐门外门子弟，来到斗罗大陆后与伙伴们一起在异界大陆重新建立了唐门。"
        唐三.SkillName = ["缠绕",
            "寄生",
            "蛛网束缚",
            "蓝银囚笼/蓝银突刺阵",
            "蓝银霸皇枪",
            "虚无状态/暴杀八段摔",
            "蓝银真身",
            "蓝银虎鲸镜之灭/蓝银虎鲸魔之摄",
            "蓝银天青龙之魂",
            "海神神环"];
        唐三.Skill = [
            SkillCreator.缠绕(),
            SkillCreator.寄生(),
            SkillCreator.蛛网束缚_单体(),
            SkillCreator.蛛网束缚_群体(),
            SkillCreator.蓝银囚笼(),
            SkillCreator.蓝银突刺阵(),
            SkillCreator.蓝银霸王枪(),
            SkillCreator.双神共存()
        ];
        唐三.SecondSkillName = ["泰坦之锤/大地之力",
            "大地蚁皇斩", "器魂真身", "千钧壁垒"]

        return 唐三;
    }

    public static 小舞(): character {
        let 小舞 = new character("小舞");
        小舞.LV = 1;
        小舞.HP = 100;
        小舞.BaseMaxHP = 100;
        小舞.MP = 20;
        小舞.BaseMaxMP = 20;
        小舞.BaseAct = 10;
        小舞.BaseDef = 10;
        小舞.BaseSpeed = 50;
        小舞.Soul = "柔骨兔";
        小舞.TeamPosition = "敏攻系";
        小舞.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        小舞.SkillName = ["腰弓",
            "魅惑",
            "瞬间闪移",
            "无敌金身",
            "柔骨锁",
            "虚无状态/暴杀八段摔",
            "柔骨兔真身"];
        小舞.Skill = [
            SkillCreator.腰弓(),
            SkillCreator.魅惑(),
            SkillCreator.双神共存()
        ]
        return 小舞;
    }

    public static 戴沐白(): character {
        let 戴沐白 = new character("戴沐白");
        戴沐白.LV = 1;
        戴沐白.HP = 100;
        戴沐白.BaseMaxHP = 100;
        戴沐白.MP = 20;
        戴沐白.BaseMaxMP = 20;
        戴沐白.BaseAct = 10;
        戴沐白.BaseDef = 10;
        戴沐白.BaseSpeed = 50;
        戴沐白.Soul = "白虎";
        戴沐白.TeamPosition = "敏攻系";
        戴沐白.Description = "史莱克七怪老大、星罗帝国三皇子 、星罗帝国太子、唐门长老、唐门刑堂堂主"
        戴沐白.SkillName = [
            "白虎护身障"
        ];
        戴沐白.Skill = [
            SkillCreator.白虎护身障()
        ]
        return 戴沐白;
    }

    public static 奥斯卡(): character {
        let 奥斯卡 = new character("奥斯卡");
        奥斯卡.LV = 1;
        奥斯卡.HP = 100;
        奥斯卡.BaseMaxHP = 100;
        奥斯卡.MP = 20;
        奥斯卡.BaseMaxMP = 20;
        奥斯卡.BaseAct = 10;
        奥斯卡.BaseDef = 10;
        奥斯卡.BaseSpeed = 50;
        奥斯卡.Soul = "香肠/食神";
        奥斯卡.TeamPosition = "辅助";
        奥斯卡.Description = "史莱克学院的学员，弗兰德院长从小收留的孤儿，大陆上第一位食物系封号斗罗，不可多得的食物系天才魂师。"
        奥斯卡.SkillName = [];
        奥斯卡.Skill = [
            SkillCreator.复活之光()
        ]
        return 奥斯卡;
    }

    public static 马红俊(): character {
        let 马红俊 = new character("马红俊");
        马红俊.LV = 1;
        马红俊.HP = 100;
        马红俊.BaseMaxHP = 100;
        马红俊.MP = 20;
        马红俊.BaseMaxMP = 20;
        马红俊.BaseAct = 10;
        马红俊.BaseDef = 10;
        马红俊.BaseSpeed = 50;
        马红俊.Soul = "邪火凤凰";
        马红俊.TeamPosition = "敏攻系";
        马红俊.Description = "拥有顶级兽武魂邪火凤凰，为变异武魂。对自身有邪火反噬的影响。"
        马红俊.SkillName = ["凤凰火线", "浴火凤凰"];
        马红俊.Skill = [
            //"凤凰火线"拥有自定义施放方法，不能被序列化，所以后期添加
            SkillCreator.浴火凤凰()
        ]
        return 马红俊;
    }

    public static 宁荣荣(): character {
        let 宁荣荣 = new character("宁荣荣");
        宁荣荣.LV = 1;
        宁荣荣.HP = 100;
        宁荣荣.BaseMaxHP = 100;
        宁荣荣.MP = 20;
        宁荣荣.BaseMaxMP = 20;
        宁荣荣.BaseAct = 10;
        宁荣荣.BaseDef = 10;
        宁荣荣.BaseSpeed = 999;     //第一时间释放技能
        宁荣荣.Soul = "九宝琉璃塔";
        宁荣荣.TeamPosition = "辅助系";
        宁荣荣.Description = "九宝琉璃宗宗主，为七宝琉璃宗前宗主宁风致和粉色长发女子(名字不详)之女，也是唯一的女儿。"
        宁荣荣.SkillName = [
            "力量增幅",
            "敏捷增幅",
            "魂力增幅",
            "防御增幅",
            "攻击增幅",
            "属性增幅",
            "九宝真身",
            "九宝神光护体",
            "九宝无敌神光"];
        宁荣荣.Skill = [
            SkillCreator.力量增益(),
            SkillCreator.敏捷增幅(),
            SkillCreator.魂力增幅(),
            SkillCreator.防御增幅(),
            SkillCreator.攻击增幅(),
            SkillCreator.复活之光()
        ]
        return 宁荣荣;
    }

    public static 朱竹清(): character {
        let 朱竹清 = new character("朱竹清");
        朱竹清.LV = 1;
        朱竹清.HP = 100;
        朱竹清.BaseMaxHP = 100;
        朱竹清.MP = 20;
        朱竹清.BaseMaxMP = 20;
        朱竹清.BaseAct = 10;
        朱竹清.BaseDef = 10;
        朱竹清.BaseSpeed = 50;
        朱竹清.Soul = "幽冥灵猫";
        朱竹清.TeamPosition = "敏攻系";
        朱竹清.Description = "星罗帝国贵族朱家二小姐，在戴沐白被封星罗太子之后，被册封为太子妃"
        朱竹清.SkillName = ["幽冥突刺", "幽冥百爪", "幽冥斩"];
        朱竹清.Skill = [
            SkillCreator.幽冥突刺(), SkillCreator.幽冥百爪(), SkillCreator.幽冥斩()
        ]
        return 朱竹清;
    }

    public static 赵无极(): character {
        let 赵无极 = new character("赵无极");
        赵无极.LV = 65;
        赵无极.HP = 1000;
        赵无极.BaseMaxHP = 1000;
        赵无极.MP = 200;
        赵无极.BaseMaxMP = 200;
        赵无极.BaseAct = 100;
        赵无极.BaseDef = 100;
        赵无极.BaseSpeed = 10;
        赵无极.Soul = "大力金刚熊";
        赵无极.TeamPosition = "强攻系";
        赵无极.Description = "人称不动明王，防御力惊人，曾经风靡一时的狠辣角色，后来到史莱克学院当老师。虽外表凶狠，但内心善良，且十分护短，非常喜爱史莱克七怪。"
        赵无极.SkillName = [
            "不动明王身",
            "大力金刚掌",
            "重力增强",
            "定位追踪",
            "重力挤压",
            "大力金刚吼",
            "武魂真身"];
        赵无极.Skill = [
            SkillCreator.不动明王身(),
        ];
        赵无极.AI = (role, status) => {
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