import { Injectable } from "@angular/core";
import { character, doubleSoul } from '../Modal/character';
import { DataStorage } from '../Lib/datastorage';
import { CharacterCreatorMainRole } from '../Creator/CharacterCreatorMainRole';
import { FightStatus } from './FightStatus';
import { ToolInfo } from '../Modal/ToolInfo';
import { ToolCreator } from '../Creator/ToolCreator';
import { SkillCreator } from '../Creator/SkillCreator';
import { CharacterCreatorNPC } from '../Creator/CharacterCreatorNPC';
import { BattleMgr } from './BattleMgr';
import { BagMgr } from './BagMgr';
import { SceneMgr } from './SceneMgr';


@Injectable()
export class GameEngine {
    constructor(
        public localstorage: DataStorage,
        public battlemgr: BattleMgr,
        public scenemgr: SceneMgr,
        public bagMgr:BagMgr
    ) {
        /**初始化道具 */
        this.InitTool();
    }
    IsDebugMode: boolean = true;
    /**道具列表 */
    StoreToolList: Array<ToolInfo>;
    /**初始化道具 */
    public InitTool() {
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

    public 唐三: doubleSoul;
    public 小舞: character;
    public 戴沐白: character;
    public 奥斯卡: character;
    public 马红俊: character;
    public 宁荣荣: character;
    public 朱竹清: character;

    public PictorialBook: Array<character> = new Array<character>();
    public GetRoleByName(name: string): character {
        if (name === undefined) return undefined;
        return this.PictorialBook.find(x => x.Name === name);
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
    }

    public 赵无极: character;
    public 独孤雁: character;
    public 独孤博: character;
    public 比比东: doubleSoul;
    public 叶泠泠: character;

    public InitNPCAndSkillCustomExcute() {
        this.赵无极 = CharacterCreatorNPC.赵无极();
        this.赵无极.Factor = 0.6;
        this.独孤雁 = CharacterCreatorNPC.独孤雁();
        this.独孤博 = CharacterCreatorNPC.独孤博();
        this.比比东 = CharacterCreatorNPC.比比东();
        this.叶泠泠 = CharacterCreatorNPC.叶泠泠();

        //图鉴准备
        this.PictorialBook.push(this.唐三);
        this.PictorialBook.push(this.小舞);
        this.PictorialBook.push(this.戴沐白);
        this.PictorialBook.push(this.奥斯卡);
        this.PictorialBook.push(this.马红俊);
        this.PictorialBook.push(this.宁荣荣);
        this.PictorialBook.push(this.朱竹清);

        this.PictorialBook.push(this.赵无极);
        this.PictorialBook.push(this.独孤雁);
        this.PictorialBook.push(this.独孤博);
        this.PictorialBook.push(this.比比东);
        this.PictorialBook.push(this.叶泠泠);

        this.PictorialBook.push(CharacterCreatorNPC.昆图库塔卡提考特苏瓦西拉松());
        this.PictorialBook.push(CharacterCreatorNPC.达拉崩巴斑得贝迪卜多比鲁翁());

        //无法序列化的魂技
        this.GetRoleByName("马红俊").Skill.push(SkillCreator.凤凰火线());

        //武魂融合技
        let s = SkillCreator.幽冥白虎();
        s.Combine.forEach(
            c => {
                this.GetRoleByName(c).Skill.push(s);
            }
        )
    }

    public InitBag() {
        SceneMgr.lineIdx = 0;
        SceneMgr.sceneName = "Scene0000";
        this.bagMgr.Money = 10;
        /**给3个止血草 */
        this.bagMgr.changeTool([ToolCreator.止血草().Name, 5, ToolCreator.止血草().Icon]);
        this.bagMgr.changeTool([ToolCreator.小烤肠().Name, 2, ToolCreator.小烤肠().Icon]);
        this.bagMgr.changeTool([ToolCreator.菩提血().Name, 1, ToolCreator.菩提血().Icon]);
        this.localstorage.Save("游戏状态", this.bagMgr);
    }

    public NewGame() {
        if (!this.IsDebugMode) this.battlemgr.Load();
        if (!this.IsDebugMode) this.scenemgr.Load();

        this.InitBag();
        this.InitRole();
        this.InitNPCAndSkillCustomExcute();
    }

    public Load() {
        this.bagMgr = this.localstorage.Load<BagMgr>("游戏状态");
        if (this.bagMgr === null) {
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

        this.localstorage.Save("游戏状态", this.bagMgr);
    }

    public fightStatus: FightStatus;
    public InitFightStatus() {
        let battleinfo = this.IsDebugMode ? BattleMgr.getBattleInfoByName_Debug(BattleMgr.fightname) :
            this.battlemgr.getBattleInfoByName(BattleMgr.fightname);
        this.fightStatus = new FightStatus(battleinfo, this.PictorialBook);
    }
}