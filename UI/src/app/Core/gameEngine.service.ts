import { Injectable } from "@angular/core";
import { Character } from '../Modal/Character';
import { DataStorage } from '../Lib/datastorage';
import { CharacterCreatorMainRole } from '../Creator/CharacterCreatorMainRole';
import { CharacterCreatorNPC } from '../Creator/CharacterCreatorNPC';
import { ToolInfo } from '../Modal/ToolInfo';
import { ToolCreator } from '../Creator/ToolCreator';
import { BattleMgr } from './BattleMgr';
import { BagMgr } from './BagMgr';
import { SceneMgr } from './SceneMgr';
import { SkillMgr } from './SkillMgr';
import { ForestMgr } from './ForestMgr';
import { MapCreator } from '../Creator/MapCreator';


@Injectable()
export class GameEngine {
    constructor(
        public localstorage: DataStorage,
        public battlemgr: BattleMgr,
        public scenemgr: SceneMgr,
        public bagMgr: BagMgr,
        public skillMgr: SkillMgr,
        public forestMgr: ForestMgr
    ) {

    }
    IsDebugMode: boolean = true;

    /**道具列表 */
    StoreToolList: Array<ToolInfo>;
    /**初始化道具 */
    public InitStoreTool() {
        this.StoreToolList = new Array<ToolInfo>();
        this.StoreToolList.push(ToolCreator.止血草());
        this.StoreToolList.push(ToolCreator.小烤肠());
        this.StoreToolList.push(ToolCreator.小橙瓶());
        this.StoreToolList.push(ToolCreator.观音泪());
        this.StoreToolList.push(ToolCreator.菩提血());
        this.StoreToolList.push(ToolCreator.阎王帖());
        this.StoreToolList.push(ToolCreator.佛怒唐莲());
    }
    getTool(name: string): ToolInfo {
        let t = this.StoreToolList.find(x => x.Name === name);
        return t;
    }

    public PictorialBook: Array<Character> = new Array<Character>();
    public GetRoleByName(name: string): Character {
        if (name === undefined) return undefined;
        return this.PictorialBook.find(x => x.Name === name);
    }

    public 唐三: Character;
    public 小舞: Character;
    public 戴沐白: Character;
    public 奥斯卡: Character;
    public 马红俊: Character;
    public 宁荣荣: Character;
    public 朱竹清: Character;

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
    }

    InitPictorialBook() {
        //图鉴准备
        this.PictorialBook = [];
        this.PictorialBook.push(this.唐三);
        this.PictorialBook.push(this.小舞);
        this.PictorialBook.push(this.戴沐白);
        this.PictorialBook.push(this.奥斯卡);
        this.PictorialBook.push(this.马红俊);
        this.PictorialBook.push(this.宁荣荣);
        this.PictorialBook.push(this.朱竹清);
        this.PictorialBook.push(CharacterCreatorNPC.玉小刚());
        this.PictorialBook.push(CharacterCreatorNPC.弗兰德());
        this.PictorialBook.push(CharacterCreatorNPC.柳二龙());
        this.PictorialBook.push(CharacterCreatorNPC.赵无极());
        this.PictorialBook.push(CharacterCreatorNPC.独孤雁());
        this.PictorialBook.push(CharacterCreatorNPC.独孤博());
        this.PictorialBook.push(CharacterCreatorNPC.比比东());
        this.PictorialBook.push(CharacterCreatorNPC.叶泠泠());
        this.PictorialBook.push(CharacterCreatorNPC.昆图库塔卡提考特苏瓦西拉松());
        this.PictorialBook.push(CharacterCreatorNPC.达拉崩巴斑得贝迪卜多比鲁翁());
    }

    /**融合技 */
    InitCombineSkill() {
        this.skillMgr.InitSkillInfoList();
        this.PictorialBook.forEach(
            c => { c.CombineSkill = this.skillMgr.SearchCombineSkill(c.Name); }
        )
    }

    public InitBag() {
        this.bagMgr.Money = 10;
        /**给3个止血草 */
        this.bagMgr.changeTool([ToolCreator.止血草().Name, 5]);
        this.bagMgr.changeTool([ToolCreator.小烤肠().Name, 2]);
        this.bagMgr.changeTool([ToolCreator.观音泪().Name, 1]);
    }

    public InitScene(){
        this.scenemgr.lineIdx = 0;
        this.scenemgr.sceneName = "Scene0000";
    }

    public InitMaze() {
        this.forestMgr.MazeInfoList = [];
        this.forestMgr.MazeInfoList.push(MapCreator.InitArea("Maze0001", "星斗大森林新手区入口(Maze0001)", MapCreator.BeginnerEntry));
        this.forestMgr.MazeInfoList.push(MapCreator.InitArea("Maze0002", "星斗大森林新手区入口(Maze0002)", MapCreator.BeginnerEntry2));
        this.forestMgr.Reset();
        this.forestMgr.LoadCurrentStatus(["Maze0001", 8, 3]);
        this.forestMgr.CurrentRoleColIdx = MapCreator.RoleInitColIdx;
        this.forestMgr.CurrentRoleRowIdx = MapCreator.RoleInitRowIdx;
        let initCell = this.forestMgr.CurrentMazeInfo.MazeArray.getValue(this.forestMgr.CurrentRoleRowIdx, this.forestMgr.CurrentRoleColIdx);
        initCell.IsRolePosition = true;
        MapCreator.SetVisiable(this.forestMgr.CurrentMazeInfo.MazeArray, initCell);
    }

    /**新游戏 */
    public NewGame() {
        this.InitRole();
        this.InitMaze();
        this.InitBag();
        this.InitScene();
        this.SaveData();

        this.InitStoreTool()
        this.InitPictorialBook();
        this.InitCombineSkill();    //注意次序，任务列表做完之后才能做融合技处理 
    }

    public LoadGame() {
        this.LoadData();
        if (this.唐三 === undefined) {
            this.InitRole();
            this.InitMaze();
            this.InitBag();
            this.InitScene();
        }
        this.InitStoreTool()
        this.InitPictorialBook();
        this.InitCombineSkill();    //注意次序，任务列表做完之后才能做融合技处理 
    }
    public LoadData() {
        this.唐三 = this.localstorage.Load<Character>("唐三");
        this.小舞 = this.localstorage.Load<Character>("小舞");
        this.戴沐白 = this.localstorage.Load<Character>("戴沐白");
        this.奥斯卡 = this.localstorage.Load<Character>("奥斯卡");
        this.马红俊 = this.localstorage.Load<Character>("马红俊");
        this.宁荣荣 = this.localstorage.Load<Character>("宁荣荣");
        this.朱竹清 = this.localstorage.Load<Character>("朱竹清");

        this.bagMgr = this.localstorage.Load<BagMgr>("背包状态");
        this.forestMgr = this.localstorage.Load<ForestMgr>("迷宫状态");
        this.scenemgr = this.localstorage.Load<SceneMgr>("场景状态")
    }
    public SaveData() {
        //这里不保存NPC的状态
        this.localstorage.Save("唐三", this.唐三);
        this.localstorage.Save("小舞", this.小舞);
        this.localstorage.Save("戴沐白", this.戴沐白);
        this.localstorage.Save("奥斯卡", this.奥斯卡);
        this.localstorage.Save("马红俊", this.马红俊);
        this.localstorage.Save("宁荣荣", this.宁荣荣);
        this.localstorage.Save("朱竹清", this.朱竹清);

        this.localstorage.Save("背包状态", this.bagMgr);
        this.localstorage.Save("迷宫状态", this.forestMgr);
        this.localstorage.Save("场景状态", this.scenemgr);
    }
}