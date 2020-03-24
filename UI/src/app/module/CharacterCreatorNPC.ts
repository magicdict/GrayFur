import { character, enmTeamPosition } from '../Modal/character';
import { SkillCreator } from './SkillCreator';
import { RPGCore } from '../Modal/RPGCore';

export class CharacterCreatorNPC {
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
        赵无极.AI = (role, status) => {
            //初级阶段,对前排的一个活人进行普通攻击
            status.MyTeam.some(element => {
                if (element !== undefined && element.HP > 0) {
                    element.HP -= RPGCore.NornamAct(role, element);
                    if (element.HP <= 0) element.HP = 0;
                    return true;
                }
            });
        }
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
}