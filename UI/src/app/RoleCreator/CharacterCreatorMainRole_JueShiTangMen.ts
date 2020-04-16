import { Character, enmTeamPosition, Character_JueShiTangMen } from '../Modal/Character';
import { CircleCreatorMainRole } from './CircleCreatorMainRole';
import { SpiritCreator } from '../Creator/SpiritCreator';
import { CircleCreatorMainRole_JueShiTangMen } from './CircleCreatorMainRole_JueShiTangMen';

export class CharacterCreatorMainRole_JueShiTangMen {

    public static 霍雨浩(): Character {
        let 霍雨浩 = new Character_JueShiTangMen("霍雨浩");
        霍雨浩.LV = 16;
        霍雨浩.GrowthFactor = 1.6;
        霍雨浩.Soul = "灵眸·修罗之瞳";
        霍雨浩.TeamPosition = enmTeamPosition.控制系;
        霍雨浩.Circles = CircleCreatorMainRole_JueShiTangMen.霍雨浩_灵眸_修罗之瞳();
        霍雨浩.SecondSoul = "冰碧帝皇蝎";
        霍雨浩.SecondCircles = CircleCreatorMainRole_JueShiTangMen.霍雨浩_冰碧帝皇蝎();
        霍雨浩.ThirdSoul = "死灵圣法神";
        霍雨浩.ThirdCircles = CircleCreatorMainRole_JueShiTangMen.霍雨浩_死灵圣法神();
        霍雨浩.Description = "斗罗大陆最强者，有史以来最强大的极限斗罗；十级魂导师，有史以来最强大的魂导师；星罗帝国世袭侯爵；唐门主要成员之一；曾为海神阁顺位继承人，后为海神阁名誉阁主；传灵塔创建者兼名誉塔主；史莱克学院极限单兵计划的唯一成功者。";
        霍雨浩.Spirits = [SpiritCreator.冰天雪女()];
        霍雨浩.NovelName = "绝世唐门";
        return 霍雨浩;
    }

    public static 马小桃(): Character {
        let 马小桃 = new Character_JueShiTangMen("马小桃");
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