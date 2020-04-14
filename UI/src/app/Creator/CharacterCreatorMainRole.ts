import { Character, enmTeamPosition } from '../Modal/Character';
import { BoneCreator } from '../Modal/Bone';
import { FieldCreator } from '../Modal/Field';
import { CircleCreatorMainRole } from './CircleCreatorMainRole';

export class CharacterCreatorMainRole {
    public static 唐三(): Character {
        let 唐三 = new Character("唐三");
        唐三.LV = 29;
        唐三.GrowthFactor = 1.5;
        唐三.Bones = [
            BoneCreator.外附魂骨八蛛矛(),
            BoneCreator.天青牛蟒右臂骨(),
            BoneCreator.泰坦巨猿左臂骨(),
            BoneCreator.深海魔鲸王的躯干骨(),
            BoneCreator.精神凝聚之智慧头骨(),
            BoneCreator.蓝银皇右腿骨(),
            BoneCreator.邪魔虎鲸王左腿骨()
        ]
        唐三.TeamPosition = enmTeamPosition.控制系;
        唐三.Description = "唐三前世为巴蜀唐门外门子弟，来到斗罗大陆后与伙伴们一起在异界大陆重新建立了唐门。"
        唐三.Soul = "蓝银皇";
        唐三.Circles = CircleCreatorMainRole.唐三_0();
        唐三.SecondSoul = "昊天锤";
        唐三.SecondCircles = CircleCreatorMainRole.唐三_1();
        唐三.Fields = [FieldCreator.蓝银领域(), FieldCreator.海神领域(),
        FieldCreator.杀神领域(), FieldCreator.修罗领域()];
        return 唐三;
    }

    public static 小舞(): Character {
        let 小舞 = new Character("小舞");
        小舞.LV = 25;
        小舞.GrowthFactor = 1.4;
        小舞.Soul = "柔骨兔";
        小舞.Circles = CircleCreatorMainRole.小舞();
        小舞.TeamPosition = enmTeamPosition.敏攻系;
        小舞.Description = "小舞的名字是由其父“小五”得来，因为她是家族中第五个出生的，小舞的爸爸懒得取名，就把名字换了一个字。“小舞”这个名字也是由此而来的。"
        return 小舞;
    }

    public static 戴沐白(): Character {
        let 戴沐白 = new Character("戴沐白");
        戴沐白.LV = 35;
        戴沐白.GrowthFactor = 1.4;
        戴沐白.Soul = "白虎";
        戴沐白.Circles = CircleCreatorMainRole.戴沐白();
        戴沐白.TeamPosition = enmTeamPosition.强攻系;
        戴沐白.Description = "史莱克七怪老大、星罗帝国三皇子 、星罗帝国太子、唐门长老、唐门刑堂堂主"
        return 戴沐白;
    }

    public static 奥斯卡(): Character {
        let 奥斯卡 = new Character("奥斯卡");
        奥斯卡.LV = 25;
        奥斯卡.GrowthFactor = 1.3;
        奥斯卡.Soul = "香肠/食神";
        奥斯卡.TeamPosition = enmTeamPosition.食物系;
        奥斯卡.Description = "史莱克学院的学员，弗兰德院长从小收留的孤儿，大陆上第一位食物系封号斗罗，不可多得的食物系天才魂师。"
        return 奥斯卡;
    }

    public static 马红俊(): Character {
        let 马红俊 = new Character("马红俊");
        马红俊.LV = 25;
        马红俊.GrowthFactor = 1.3;
        马红俊.Soul = "邪火凤凰";
        马红俊.Circles = CircleCreatorMainRole.凤凰家族共用();
        马红俊.TeamPosition = enmTeamPosition.强攻系;
        马红俊.Description = "拥有顶级兽武魂邪火凤凰，为变异武魂。对自身有邪火反噬的影响。"
        return 马红俊;
    }

    public static 宁荣荣(): Character {
        let 宁荣荣 = new Character("宁荣荣");
        宁荣荣.LV = 25;
        宁荣荣.GrowthFactor = 1.2;
        宁荣荣.Soul = "九宝琉璃塔";
        宁荣荣.Circles = CircleCreatorMainRole.宁荣荣();
        宁荣荣.TeamPosition = enmTeamPosition.辅助系;
        宁荣荣.Description = "九宝琉璃宗宗主，为七宝琉璃宗前宗主宁风致和粉色长发女子(名字不详)之女，也是唯一的女儿。"
        return 宁荣荣;
    }

    public static 朱竹清(): Character {
        let 朱竹清 = new Character("朱竹清");
        朱竹清.LV = 25;
        朱竹清.GrowthFactor = 1.2;
        朱竹清.Soul = "幽冥灵猫";
        朱竹清.Circles = CircleCreatorMainRole.朱竹清();
        朱竹清.TeamPosition = enmTeamPosition.敏攻系;
        朱竹清.Description = "星罗帝国贵族朱家二小姐，在戴沐白被封星罗太子之后，被册封为太子妃"
        return 朱竹清;
    }


}