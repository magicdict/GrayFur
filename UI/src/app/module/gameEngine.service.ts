import { Injectable } from "@angular/core";
import { character, doubleSoul } from '../Modal/character';
import { DataStorage } from '../Lib/datastorage';
import { CharacterCreator } from './CharacterCreator';
import { getBattleInfoByName } from '../Modal/BattleInfo';
import { FightStatus } from './FightStatus';
import { ToolInfo } from '../Modal/ToolInfo';
import { ToolSkillCreator } from './ToolSkillCreator';


@Injectable()
export class GameEngine {
    constructor(private localstorage: DataStorage) {
        /**初始化道具 */
        this.InitTool();
    }

    /**道具列表 */
    StoreToolList: Array<ToolInfo>;
    /**初始化道具 */
    public InitTool() {
        this.StoreToolList = new Array<ToolInfo>();
        this.StoreToolList.push(ToolSkillCreator.止血草());
        this.StoreToolList.push(ToolSkillCreator.小烤肠());
        this.StoreToolList.push(ToolSkillCreator.小黑瓶());
    }

    getTool(name: string): ToolInfo {
        let t = this.StoreToolList.find(x => x.Name === name);
        return t;
    }

    public 唐三: doubleSoul;
    public 小舞: character;
    public 戴沐白: character;
    public 奥斯卡: character;
    public 马红俊: character;
    public 宁荣荣: character;
    public 朱竹清: character;

    public 赵无极: character;

    public currentRole: character;

    public GetRoleByName(name: string): character {
        switch (name) {
            case "唐三":
                return this.唐三
            case "小舞":
                return this.小舞
            case "戴沐白":
                return this.戴沐白
            case "奥斯卡":
                return this.奥斯卡
            case "马红俊":
                return this.马红俊
            case "宁荣荣":
                return this.宁荣荣
            case "朱竹清":
                return this.朱竹清
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

        this.戴沐白 = CharacterCreator.戴沐白();
        this.localstorage.Save("戴沐白", this.戴沐白);
        this.奥斯卡 = CharacterCreator.奥斯卡();
        this.localstorage.Save("奥斯卡", this.奥斯卡);

        this.马红俊 = CharacterCreator.马红俊();
        this.localstorage.Save("马红俊", this.马红俊);
        this.宁荣荣 = CharacterCreator.宁荣荣();
        this.localstorage.Save("宁荣荣", this.宁荣荣);

        this.朱竹清 = CharacterCreator.朱竹清();
        this.localstorage.Save("朱竹清", this.朱竹清);


        this.赵无极 = CharacterCreator.赵无极();
        this.localstorage.Save("赵无极", this.赵无极);
        this.currentRole = this.唐三;
    }

    public gamestatus: GameStatus;
    public InitGameStatus() {
        this.gamestatus = new GameStatus();
        this.gamestatus.lineIdx = 0;
        this.gamestatus.sceneName = "Scene0000";

        this.gamestatus.Money = 10;
        /**给3个止血草 */
        this.gamestatus.changeTool([ToolSkillCreator.止血草().Name, 5]);
        this.gamestatus.changeTool([ToolSkillCreator.小烤肠().Name, 2]);
        this.localstorage.Save("游戏状态", this.gamestatus);
    }

    public NewGame() {
        this.InitGameStatus();
        this.InitRole();
    }

    public Load() {
        this.gamestatus = this.localstorage.Load<GameStatus>("游戏状态");
        if (this.gamestatus === null) {
            this.NewGame();
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
    Money: number;
    sceneName: string = "Scene0000";    //场景编号
    lineIdx: number = 0;    //台词位置
    fightname: string;
    /**道具 */
    toolbag: Array<[string, number]> = new Array<[string, number]>();
    getToolHoldCnt(name: string): number {
        let t = this.toolbag.find(x => x[0] === name);
        return (t === undefined) ? 0 : t[1];
    }
    changeTool(ToolWithCnt: [string, number]) {
        let t = this.toolbag.find(x => x[0] === ToolWithCnt[0])
        if (t === undefined) {
            //不存在的情况
            this.toolbag.push(ToolWithCnt);
        } else {
            ToolWithCnt[1] += t[1];
            this.toolbag = this.toolbag.filter(x => x[0] !== ToolWithCnt[0]);
            this.toolbag.push(ToolWithCnt);
        }
        //使用完了，则从背包中删除掉
        this.toolbag = this.toolbag.filter(x => x[1] > 0);
    }
}