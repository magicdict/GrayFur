import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';
import { Character } from '../Modal/Character';
import { SkillInfo, enmRange, enmDirect } from '../Modal/SkillInfo';
import { RPGCore } from '../Core/RPGCore';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';
import { ToastService } from '../toasts/toast-service';
import { ResourceMgr } from '../Core/ResourceMgr';
import { SceneMgr } from '../Core/SceneMgr';
import { BagMgr } from '../Core/BagMgr';
import { BattleMgr } from '../Core/BattleMgr';
import { ForestMgr } from '../Core/ForestMgr';
import { FightStatus } from '../Core/FightStatus';
import { ToolInfo } from '../Modal/ToolInfo';


@Component({
    templateUrl: './fight.component.html',
})
export class FightComponent implements OnInit {
    constructor(public ge: GameEngine,
        private router: Router,
        public bagmgr: BagMgr,
        private scenemgr: SceneMgr,
        private forestmgr: ForestMgr,
        public toastService: ToastService
    ) {

    }

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    fightStatus: FightStatus;
    iconMgr = ResourceMgr;
    Message: string = "进入战场";
    /**正在选择技能 */
    SkillPickStatus: boolean;
    SkillDescript: SkillInfo;
    /**正在选择道具 */
    ToolPickStatus: boolean;
    ToolDescript: ToolInfo;
    /**正在选择技能使用对象 */
    SkillRolePickStatus: boolean;
    FightEnd: boolean = false;
    FightResultTitle: string = "";

    ngOnInit(): void {
        this.InitFightStatus();
        this.fightStatus.EnemyAction.subscribe((x: string) => {
            console.log("Emit EnemyAction:" + x);
            this.toastService.show(x, { classname: 'bg-danger text-light', delay: 3000 });
        }, null, null);

        this.fightStatus.ResultEvent.subscribe((exp: number) => {
            if (exp === 0) {
                this.FightResultTitle = "团灭了......魂力不足"
                if (BattleMgr.fightname !== BattleMgr.MonsterFightName) this.scenemgr.lineIdx--;
            } else {
                this.FightResultTitle = "胜利了......奥力给!每人获得经验【" + exp + "】"
                if (BattleMgr.fightname !== BattleMgr.MonsterFightName) {
                    this.scenemgr.lineIdx++;
                } else {
                    //调整位置
                    this.forestmgr.MonsterVictor();
                }
            }
            this.FightEnd = true;
            if (BattleMgr.fightname === BattleMgr.MonsterFightName) {
                setTimeout(() => { this.router.navigateByUrl("forest"); }, 1500);
            } else {
                setTimeout(() => { this.router.navigateByUrl("scene"); }, 1500);
            }
        }, null, null);
        this.fightStatus.NewTurn();
        this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
    }

    InitFightStatus() {
        if (BattleMgr.fightname === BattleMgr.MonsterFightName) {
            this.fightStatus = new FightStatus(BattleMgr.MazeBattleInfo, this.ge.PictorialBook);
        } else {
            let battleinfo = this.ge.IsDebugMode ? BattleMgr.getBattleInfoByName_Debug(BattleMgr.fightname) :
                this.ge.battlemgr.getBattleInfoByName(BattleMgr.fightname);
            this.fightStatus = new FightStatus(battleinfo, this.ge.PictorialBook);
        }
    }

    /**对象目标选择 */
    ItemClicked(_pickedCharacter: Character) { }

    get IsFuncAreaAvilible(): boolean {
        if (this.SkillPickStatus) return false;
        if (this.ToolPickStatus) return false;
        if (this.SkillRolePickStatus) return false;
        return true;
    }

    /**攻击 */
    Attack() {
        //如果处于选择魂技等状态下，则无效
        if (!this.IsFuncAreaAvilible) return;
        console.log("普通攻击");
        this.Message = "请选择一个攻击目标";
        this.ItemClicked = (clickedItem: Character) => {
            clickedItem.HP -= RPGCore.NornamAct(this.fightStatus.currentActionCharater, clickedItem);
            this.fightStatus.ActionDone();
            this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
            this.ItemClicked = (_clickedItem: Character) => { }
        }
    }

    /**魂技 */
    Skill() {
        if (!this.IsFuncAreaAvilible) return;
        if (this.fightStatus.currentActionCharater.Skill.length === 0) return;
        this.SkillPickStatus = true;
        this.SkillDescript = this.fightStatus.currentActionCharater.Skill[0];
        this.Message = "请选择一个魂技";
    }

    ExcuteSkill(Skill: SkillInfo) {
        console.log("发动魂技:" + Skill.Name);
        console.log("Range:" + Skill.Range);
        console.log("Direct:" + Skill.Direct);
        this.fightStatus.currentActionCharater.MP -= Skill.MpUsage;
        Skill.CurrentColdDown = Skill.ColdDownTurn + 1; //本轮结束会自动减1，所以这里额外加1
        this.SkillPickStatus = false;
        //武魂融合技
        if (Skill.Combine !== undefined) {
            Skill.Combine.forEach(
                c => {
                    this.fightStatus.TurnList = this.fightStatus.TurnList.map(x => x.Name === c ? undefined : x);
                }
            )
        }

        //根据不同的技能对象确定是否要选择技能的受体
        switch (Skill.Range) {
            case enmRange.Self:
                //对自己使用的技能
                Skill.Excute(this.fightStatus.currentActionCharater, this.fightStatus);
                this.fightStatus.ActionDone();
                this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
                break;
            case enmRange.PickOne:
                this.SkillRolePickStatus = true;
                switch (Skill.Direct) {
                    case enmDirect.Enemy:
                        //敌人全体
                        this.Message = "请选择一个敌人";
                        this.ItemClicked = (clickedItem: Character) => {
                            if (!clickedItem.IsMyTeam) {
                                Skill.Excute(clickedItem, this.fightStatus);
                                this.SkillRolePickStatus = false;
                                this.fightStatus.ActionDone();
                                this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
                                this.ItemClicked = (_clickedItem: Character) => { }
                            }
                        }
                        break;
                    case enmDirect.MyTeam:
                        //我军全体
                        this.Message = "请选择一个队友";
                        this.ItemClicked = (clickedItem: Character) => {
                            if (clickedItem.IsMyTeam) {
                                Skill.Excute(clickedItem, this.fightStatus);
                                this.SkillRolePickStatus = false;
                                this.fightStatus.ActionDone();
                                this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
                                this.ItemClicked = (_clickedItem: Character) => { }
                            }
                        }
                        break;
                    default:
                        //战场全体
                        this.Message = "请选择任意选择一人";
                        this.ItemClicked = (clickedItem: Character) => {
                            Skill.Excute(clickedItem, this.fightStatus);
                            this.SkillRolePickStatus = false;
                            this.fightStatus.ActionDone();
                            this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
                            this.ItemClicked = (_clickedItem: Character) => { }
                        }
                        break;
                }
                break;
            case enmRange.EveryOne:
                //TODO:对于所有人都使用的技能
                switch (Skill.Direct) {
                    case enmDirect.Enemy:
                        //敌人全体
                        this.fightStatus.Enemy.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.fightStatus);
                        });
                        break;
                    case enmDirect.MyTeam:
                        //我军全体
                        this.fightStatus.MyTeam.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.fightStatus);
                        });
                        break;
                    default:
                        //战场全体
                        this.fightStatus.MyTeam.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.fightStatus);
                        });
                        this.fightStatus.Enemy.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.fightStatus);
                        });
                        break;
                }
                this.fightStatus.ActionDone();
                this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
                break;
            default:
                break;
        }
    }

    ReturnFormSkillPicker() {
        this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
        this.SkillPickStatus = false;
    }

    //道具
    Tool() {
        if (!this.IsFuncAreaAvilible) return;
        if (this.bagmgr.toolbag.length === 0) return;
        this.ToolPickStatus = true;
        this.ToolDescript = this.ge.getTool(this.bagmgr.toolbag[0][0]);
        this.Message = "请选择一个道具";
    }
    UseTool(name: string) {
        this.ToolPickStatus = false;
        let t = this.ge.getTool(name);
        this.ExcuteSkill(t.Func);   //ExcuteSkill已经包含了ActionDone！
        this.ge.bagMgr.changeTool([t.Name, -1]);
    }
    ReturnFormToolPicker() {
        this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
        this.ToolPickStatus = false;
    }

    //防御
    Defence() {
        if (!this.IsFuncAreaAvilible) return;
        this.ExcuteSkill(CircleSkillCreator.防御());   //ExcuteSkill已经包含了ActionDone！
        this.Message = this.fightStatus.currentActionCharater.Name + "的行动";
    }

    //测试用:模拟胜利
    Exit() {
        console.log("jump to scene");
        this.scenemgr.lineIdx++;
        this.router.navigateByUrl("scene");
    }
}