import { Injectable } from "@angular/core";
import { character, doubleSoul } from '../Modal/character';
import { DataStorage } from '../Lib/datastorage';
import { CharacterCreatorMainRole } from './CharacterCreatorMainRole';
import { getBattleInfoByName } from '../Modal/BattleInfo';
import { FightStatus } from './FightStatus';
import { ToolInfo } from '../Modal/ToolInfo';
import { ToolCreator } from './ToolCreator';
import { SkillCreator } from './SkillCreator';
import { CharacterCreatorNPC } from './CharacterCreatorNPC';


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
        this.StoreToolList.push(ToolCreator.止血草());
        this.StoreToolList.push(ToolCreator.小烤肠());
        this.StoreToolList.push(ToolCreator.小黑瓶());
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
                case "独孤雁":
                    return this.独孤雁
            default:
                return undefined;
        }
    }

    public InitRole() {
        this.唐三 = CharacterCreatorMainRole.唐三();
        this.小舞 = CharacterCreatorMainRole.小舞();
        this.戴沐白 = CharacterCreatorMainRole.戴沐白();
        this.奥斯卡 = CharacterCreatorMainRole.奥斯卡();
        this.马红俊 = CharacterCreatorMainRole.马红俊();
        this.宁荣荣 = CharacterCreatorMainRole.宁荣荣();
        this.朱竹清 = CharacterCreatorMainRole.朱竹清();

        this.localstorage.Save("唐三", this.唐三);
        this.localstorage.Save("小舞", this.小舞);
        this.localstorage.Save("戴沐白", this.戴沐白);
        this.localstorage.Save("奥斯卡", this.奥斯卡);
        this.localstorage.Save("马红俊", this.马红俊);
        this.localstorage.Save("宁荣荣", this.宁荣荣);
        this.localstorage.Save("朱竹清", this.朱竹清);
        this.currentRole = this.唐三;
    }

    public 赵无极: character;
    public 独孤雁: character;
    public InitNPCAndSkillCustomExcute() {
        this.赵无极 = CharacterCreatorNPC.赵无极();
        this.赵无极.Factor = 0.6;
        this.独孤雁 = CharacterCreatorNPC.独孤雁();
        //以下为无法序列化的魂技
        this.马红俊.Skill.push(SkillCreator.凤凰火线()); 
    }

    public gamestatus: GameStatus;
    public InitGameStatus() {
        this.gamestatus = new GameStatus();
        this.gamestatus.lineIdx = 0;
        this.gamestatus.sceneName = "Scene0000";

        this.gamestatus.Money = 10;
        /**给3个止血草 */
        this.gamestatus.changeTool([ToolCreator.止血草().Name, 5]);
        this.gamestatus.changeTool([ToolCreator.小烤肠().Name, 2]);
        this.localstorage.Save("游戏状态", this.gamestatus);
    }

    public NewGame() {
        this.InitGameStatus();
        this.InitRole();
        this.InitNPCAndSkillCustomExcute();
    }

    public Load() {
        this.gamestatus = this.localstorage.Load<GameStatus>("游戏状态");
        if (this.gamestatus === null) {
            this.NewGame();
        } else {
            this.唐三 = this.localstorage.Load<doubleSoul>("唐三");
            this.小舞 = this.localstorage.Load<character>("小舞");
            this.戴沐白 = this.localstorage.Load<character>("戴沐白");
            this.奥斯卡 = this.localstorage.Load<character>("奥斯卡");
            this.马红俊 = this.localstorage.Load<character>("马红俊");
            this.宁荣荣 = this.localstorage.Load<character>("宁荣荣");
            this.朱竹清 = this.localstorage.Load<character>("朱竹清");
            this.InitNPCAndSkillCustomExcute();
        }
    }

    public Save() {
        //这里不保存NPC的状态
        this.localstorage.Save("唐三", this.唐三);
        this.localstorage.Save("小舞", this.小舞);
        this.localstorage.Save("戴沐白", this.戴沐白);
        this.localstorage.Save("奥斯卡", this.奥斯卡);
        this.localstorage.Save("马红俊", this.马红俊);
        this.localstorage.Save("宁荣荣", this.宁荣荣);
        this.localstorage.Save("朱竹清", this.朱竹清);

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