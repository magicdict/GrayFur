import { Character, enmTeamPosition } from '../Modal/Character';
import { CircleCreatorMainRole } from './CircleCreatorMainRole';

export class CharacterCreatorMainRole_JueShiTangMen {
    public static 马小桃(): Character {
        let 马小桃 = new Character("马小桃");
        马小桃.LV = 25;
        马小桃.GrowthFactor = 1.3;
        马小桃.Soul = "邪火凤凰";
        马小桃.Circles = CircleCreatorMainRole.凤凰家族共用();
        马小桃.TeamPosition = enmTeamPosition.强攻系;
        马小桃.Description = "拥有顶级兽武魂邪火凤凰，为变异武魂。对自身有邪火反噬的影响。"
        马小桃.NovelName = "绝世唐门";
        return 马小桃;
    }
}