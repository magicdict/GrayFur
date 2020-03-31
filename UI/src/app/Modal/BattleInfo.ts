
export function getBattleInfoByName(FightName: string): BattleInfo {
    switch (FightName) {
        case "Battle0001":
            return Battle0001;
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

export const Battle0001: BattleInfo = {
    Title: "史莱克学院赵无极",
    Background: "战斗场地",
    Enemy: [undefined, "独孤雁", "独孤博", "叶泠泠",
        undefined, "赵无极", "比比东", undefined],
    MyTeam: ["小舞", "马红俊", "戴沐白", "朱竹清",
        undefined, "宁荣荣", "奥斯卡", "唐三"]
}