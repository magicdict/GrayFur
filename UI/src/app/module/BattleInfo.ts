import { character } from './character';

export function getBattleInfoByName(FightName:string): BattleInfo {
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
    Background: "史莱克学院",
    Enemy: [undefined, undefined, undefined, "小舞",
        undefined, "赵无极", undefined, undefined],
    MyTeam: [undefined, "唐三", "小舞", undefined,
        "唐三", undefined, undefined, , undefined]
}