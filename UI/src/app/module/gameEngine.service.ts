import { Injectable } from "@angular/core";
import { character, doubleSoul } from './character';
import { DataStorage } from './datastorage';
import { CharacterCreator } from './CharacterCreator';
import { BattleInfo, getBattleInfoByName } from './BattleInfo';
import { FightStatus } from './FightStatus';


@Injectable()
export class GameEngine {
    constructor(private localstorage: DataStorage) {

    }
    public 唐三: doubleSoul;
    public 小舞: character;
    public 赵无极: character;

    public currentRole: character;

    public GetRoleByName(name: string): character {
        switch (name) {
            case "唐三":
                return this.唐三
            case "小舞":
                return this.小舞
            case "赵无极":
                return this.赵无极
            default:
                return undefined;
        }
    }

    public InitRole() {
        this.唐三 = CharacterCreator.唐三();
        this.localstorage.Save("唐三", this.唐三);
        this.小舞 = CharacterCreator.小舞();
        this.localstorage.Save("小舞", this.小舞);
        this.赵无极 = CharacterCreator.赵无极();
        this.localstorage.Save("赵无极", this.赵无极);

        this.currentRole = this.唐三;
    }

    public gamestatus: GameStatus;
    public InitGameStatus() {
        this.gamestatus = new GameStatus();
        this.gamestatus.lineIdx = 0;
        this.gamestatus.sceneName = "Scene0000";
        this.localstorage.Save("游戏状态", this.gamestatus);
    }

    public Load() {
        this.gamestatus = this.localstorage.Load<GameStatus>("游戏状态");
        if (this.gamestatus === null) {
            this.InitGameStatus();
            this.InitRole();
        } else {
            this.唐三 = this.localstorage.Load<doubleSoul>("唐三");
            this.小舞 = this.localstorage.Load<character>("小舞");
            this.赵无极 = this.localstorage.Load<character>("赵无极");
        }
    }
    public Save() {
        this.localstorage.Save("唐三", this.唐三);
        this.localstorage.Save("小舞", this.小舞);
        this.localstorage.Save("赵无极", this.赵无极);
        this.localstorage.Save("游戏状态", this.gamestatus);
    }

    public fightStatus: FightStatus;
    public InitFightStatus() {
        let battleinfo = getBattleInfoByName(this.gamestatus.fightname);
        this.fightStatus = new FightStatus(battleinfo, this);
        this.fightStatus.NewTurn();
    }
}

export class GameStatus {
    sceneName: string = "Scene0000";    //场景编号
    lineIdx: number = 0;    //台词位置
    fightname: string;
}