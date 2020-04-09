import { character, enmTeamPosition, doubleSoul } from '../Modal/character';
import { SkillCreator } from './SkillCreator';
import { BoneCreator } from '../Modal/Bone';

export class CharacterCreatorNPC {

    public static 叶泠泠(): character {
        let 叶泠泠 = new character("叶泠泠");
        叶泠泠.LV = 35;
        叶泠泠.GrowthFactor = 1.1;
        叶泠泠.Soul = "九心海棠";
        叶泠泠.TeamPosition = enmTeamPosition.辅助系;
        叶泠泠.Description = "叶泠泠拥有九心海棠武魂，是皇斗战队唯一辅助器武魂，而九心海棠实际应该是大陆第一辅助系器武魂"
        叶泠泠.SkillName = [
            "范围性全体治疗",
        ];
        叶泠泠.Skill = [
            SkillCreator.范围性全体治疗(),
        ];
        return 叶泠泠;
    }

    public static 赵无极(): character {
        let 赵无极 = new character("赵无极");
        赵无极.LV = 65;
        赵无极.GrowthFactor = 1.1;
        赵无极.Soul = "大力金刚熊";
        赵无极.TeamPosition = enmTeamPosition.强攻系;
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

        return 赵无极;
    }

    public static 独孤雁(): character {
        let 独孤雁 = new character("独孤雁");
        独孤雁.LV = 29;
        独孤雁.GrowthFactor = 1.1;
        独孤雁.Soul = "碧鳞蛇";
        独孤雁.TeamPosition = enmTeamPosition.辅助系;
        独孤雁.Description = "独孤博的孙女,玉天恒的恋人,因为自身武魂原因而中毒,后被唐三所救。"
        独孤雁.SkillName = [
            "碧磷红毒",
            "碧磷蓝毒",
            "碧磷紫毒",
        ];
        独孤雁.Skill = [
            SkillCreator.碧磷红毒(), SkillCreator.碧磷蓝毒(), SkillCreator.碧磷紫毒(),
        ];
        return 独孤雁;
    }

    public static 独孤博(): character {
        let 独孤博 = new character("独孤博");
        独孤博.LV = 93;
        独孤博.GrowthFactor = 1.1;
        独孤博.Soul = "碧鳞蛇";
        独孤博.TeamPosition = enmTeamPosition.辅助系;
        独孤博.Description = "独孤博的孙女,玉天恒的恋人,因为自身武魂原因而中毒,后被唐三所救。";
        独孤博.Bones = [BoneCreator.万年美杜莎头骨()];
        独孤博.SkillName = [
            "碧磷红毒",
            "碧磷蓝毒",
            "碧磷紫毒",
        ];
        独孤博.Skill = [
            SkillCreator.碧磷红毒(), SkillCreator.碧磷蓝毒(), SkillCreator.碧磷紫毒(),
        ];
        return 独孤博;
    }

    public static 比比东(): doubleSoul {
        let 比比东 = new doubleSoul("比比东");
        比比东.LV = 99;
        比比东.GrowthFactor = 1.5;
        比比东.Bones = [

        ]
        比比东.Soul = "死亡蛛皇";
        比比东.SecondSoul = "噬魂蛛皇";
        比比东.TeamPosition = enmTeamPosition.控制系;
        比比东.Description = "武魂殿现任教皇也是最年轻的的教皇（34岁），武魂帝国创始人兼第一任女皇，杀戮之都杀神之一。"
        比比东.SkillName = [

            "死亡蛛网束缚",
            "荆棘蛛铠",
            "吸血蛛刺",
            "死亡蛛皇真身",
            "蛛皇分身",
            "不死之身",
        ];
        比比东.Skill = [

        ];
        比比东.SecondSkillName = [
            "半月",
            "魔蛛召唤",
            "永恒之创",
            "噬魂蛛皇真身",
            "空间撕裂之深渊斩"]
        比比东.SecondSkill = [];
        比比东.Bones = [
            BoneCreator.六翅紫光翼(),
            BoneCreator.精神免疫头骨(),
            BoneCreator.死亡蛛皇左臂骨(),
            BoneCreator.死亡蛛皇右臂骨(),
            BoneCreator.柔骨兔魂骨(),
        ];
        return 比比东;
    }



    //番外

    public static 达拉崩巴斑得贝迪卜多比鲁翁(): character {
        let 达拉崩巴斑得贝迪卜多比鲁翁 = new character("达拉崩巴斑得贝迪卜多比鲁翁");
        达拉崩巴斑得贝迪卜多比鲁翁.LV = 1;
        达拉崩巴斑得贝迪卜多比鲁翁.GrowthFactor = 1.1;
        达拉崩巴斑得贝迪卜多比鲁翁.Soul = "勇者之魂";
        达拉崩巴斑得贝迪卜多比鲁翁.TeamPosition = enmTeamPosition.强攻系;
        达拉崩巴斑得贝迪卜多比鲁翁.Description = "蒙达鲁克硫斯伯古比奇巴勒城的勇者，打败了昆图库塔卡提考特苏瓦西拉松，娶了公主米娅莫拉苏娜丹妮谢莉红"
        达拉崩巴斑得贝迪卜多比鲁翁.SkillName = [
        ];
        达拉崩巴斑得贝迪卜多比鲁翁.Skill = [
        ];
        return 达拉崩巴斑得贝迪卜多比鲁翁;
    }

    public static 昆图库塔卡提考特苏瓦西拉松(): character {
        let 昆图库塔卡提考特苏瓦西拉松 = new character("昆图库塔卡提考特苏瓦西拉松");
        昆图库塔卡提考特苏瓦西拉松.LV = 99;
        昆图库塔卡提考特苏瓦西拉松.GrowthFactor = 1.1;
        昆图库塔卡提考特苏瓦西拉松.Soul = "恶龙";
        昆图库塔卡提考特苏瓦西拉松.TeamPosition = enmTeamPosition.强攻系;
        昆图库塔卡提考特苏瓦西拉松.Description = "被蒙达鲁克硫斯伯古比奇巴勒城的勇者，打败了的恶龙"
        昆图库塔卡提考特苏瓦西拉松.SkillName = [
        ];
        昆图库塔卡提考特苏瓦西拉松.Skill = [
        ];
        return 昆图库塔卡提考特苏瓦西拉松;
    }

}