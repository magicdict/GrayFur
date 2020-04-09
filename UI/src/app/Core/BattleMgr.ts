import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';


@Injectable()
export class BattleMgr {
    constructor(public http: HttpClient) { }
    
    public static fightname: string;
    public static MazeBattleInfo:BattleInfo;
    public static MonsterFightName = "@Monster"
    BattleInfoList: BattleInfo[];
    /**开发调试阶段，便于快速修改结构体 */
    public static getBattleInfoByName_Debug(FightName: string): BattleInfo {
        switch (FightName) {
            case "Battle0001":
                return Battle0001;
            case "Battle0002":
                return Battle0002;
            default:
                break;
        }
    }

    public getBattleInfoByName(FightName: string): BattleInfo {
        return this.BattleInfoList.find(x => x.Name === FightName);
    }

    public static CreateTempBattle(Enemy: string): BattleInfo {
        return {
            Name: "",
            Title: "",
            Background: "",
            Enemy: [undefined, undefined, undefined, undefined,
                undefined, Enemy, undefined, undefined],
            MyTeam: ["小舞", "马红俊", "戴沐白", "朱竹清",
                undefined, "宁荣荣", "奥斯卡", "唐三"]
        }
    }

    public Load() {
        let x = this.http.get("assets/json/battleinfo.json").toPromise().then(x => x as BattleInfo[]);
        x.then(
            r => {
                this.BattleInfoList = r;
            }
        )
    }
}

export class BattleInfo {
    Name: string;
    Title: string;
    Background: string;
    Enemy: string[];
    MyTeam: string[];
}



export const Battle0001: BattleInfo = {
    Name: "Battle0001",
    Title: "史莱克学院赵无极",
    Background: "室内场景",
    Enemy: [undefined, "独孤雁", "独孤博", "叶泠泠",
        undefined, "赵无极", "比比东", undefined],
    MyTeam: ["小舞", "马红俊", "戴沐白", "朱竹清",
        undefined, "宁荣荣", "奥斯卡", "唐三"]
}

export const Battle0002: BattleInfo = {
    Name: "Battle0002",
    Title: "蒙达鲁克硫斯伯古比奇巴勒城",
    Background: "中式建筑走廊",
    Enemy: [undefined, undefined, undefined, undefined,
        undefined, "昆图库塔卡提考特苏瓦西拉松", undefined, undefined],
    MyTeam: [undefined, undefined, undefined, undefined,
        undefined, "达拉崩巴斑得贝迪卜多比鲁翁", undefined, undefined],
}