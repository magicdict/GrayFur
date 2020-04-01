
export function getBattleInfoByName(FightName: string): BattleInfo {
    switch (FightName) {
        case "Battle0001":
            return Battle0001;
        case "Battle0002":
            return Battle0002;
        default:
            break;
    }
}

export interface BattleInfo {
    Title: string;
    Background: string;
    Enemy: string[];
    MyTeam: string[];
}

export const Battle0002: BattleInfo = {
    Title: "蒙达鲁克硫斯伯古比奇巴勒城",
    Background: "战斗场地",
    Enemy: [undefined, undefined, undefined, undefined,
        undefined, "昆图库塔卡提考特苏瓦西拉松", undefined, undefined],
    MyTeam: [undefined, undefined, undefined, undefined,
        undefined, "达拉崩巴斑得贝迪卜多比鲁翁", undefined, undefined],
}

export const Battle0001: BattleInfo = {
    Title: "史莱克学院赵无极",
    Background: "战斗场地",
    Enemy: [undefined, "独孤雁", "独孤博", "叶泠泠",
        undefined, "赵无极", "比比东", undefined],
    MyTeam: ["小舞", "马红俊", "戴沐白", "朱竹清",
        undefined, "宁荣荣", "奥斯卡", "唐三"]
}