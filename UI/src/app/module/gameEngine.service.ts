import { Injectable } from "@angular/core";
import { character, doubleSoul } from './character';
import { DataStorage } from './datastorage';
import { SceneInfo, getSceneInfoByName } from './SceneInfo';
import { CharacterCreator } from './CharacterCreator';


@Injectable()
export class GameEngine {
    constructor(private localstorage: DataStorage) {

    }
    public 唐三: doubleSoul;
    public 小舞: character;

    public currentRole : character;

    public InitRole() {
        this.唐三 = CharacterCreator.唐三();
        this.localstorage.Save("唐三", this.唐三);
        this.小舞 = CharacterCreator.小舞();
        this.localstorage.Save("小舞", this.小舞);
        this.currentRole = this.唐三;
    }

    public status : GameStatus;
    public InitGameStatus(){
        this.status = new GameStatus();
        this.status.lineIdx = 0;
        this.status.sceneName = "Scene0000";
        this.localstorage.Save("游戏状态", this.status);
    }

    public Load() {
        var 唐三 = this.localstorage.Load<character>("唐三");
        if (唐三 === null) {
            //没有存档，则新建一个存档
            this.InitRole();
        }

        var status = this.localstorage.Load<GameStatus>("游戏状态");
        if (status === null){
            this.InitGameStatus();
        }
    }
}

export class GameStatus{
    sceneName: string = "Scene0000";    //场景编号
    lineIdx: number = 0;    //台词位置
    fightname:string;
}