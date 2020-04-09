import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';
import { character } from '../Modal/character';
import { SkillInfo, enmRange, enmDirect } from '../Modal/SkillInfo';
import { RPGCore } from '../Core/RPGCore';
import { SkillCreator } from '../Creator/SkillCreator';
import { ToastService } from '../toasts/toast-service';
import { ResourceMgr } from '../Core/ResourceMgr';
import { SceneMgr } from '../Core/SceneMgr';
import { BagMgr } from '../Core/BagMgr';
import { BattleMgr } from '../Core/BattleMgr';
import { ForestMgr } from '../Core/ForestMgr';


@Component({
    templateUrl: './fight.component.html',
})
export class FightComponent implements OnInit {
    constructor(public ge: GameEngine,
        private router: Router,
        public bagmgr: BagMgr,
        public toastService: ToastService
    ) { }

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    iconMgr = ResourceMgr;
    Message: string = "进入战场";
    /**正在选择技能 */
    SkillPickStatus: boolean;
    /**正在选择道具 */
    ToolPickStatus: boolean;
    /**正在选择技能使用对象 */
    SkillRolePickStatus: boolean;
    FightEnd: boolean = false;
    FightResultTitle: string = "";

    ngOnInit(): void {

        this.ge.InitFightStatus();
        this.ge.fightStatus.EnemyAction.subscribe((x: string) => {
            console.log("Emit EnemyAction:" + x);
            this.toastService.show(x, { classname: 'bg-danger text-light', delay: 3000 });
        }, null, null);

        this.ge.fightStatus.ResultEvent.subscribe((exp: number) => {
            if (exp === 0) {
                this.FightResultTitle = "团灭了......魂力不足"
                if (BattleMgr.fightname !== BattleMgr.MonsterFightName) SceneMgr.lineIdx--;
            } else {
                this.FightResultTitle = "胜利了......奥力给!每人获得经验【" + exp + "】"
                if (BattleMgr.fightname !== BattleMgr.MonsterFightName) {
                    SceneMgr.lineIdx++;
                } else {
                    //调整位置
                    ForestMgr.MonsterVictor();
                }
            }
            this.FightEnd = true;
            if (BattleMgr.fightname === BattleMgr.MonsterFightName) {
                setTimeout(() => { this.router.navigateByUrl("forest"); }, 1500);
            } else {
                setTimeout(() => { this.router.navigateByUrl("scene"); }, 1500);
            }
        }, null, null);
        this.ge.fightStatus.NewTurn();
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
    }

    /**对象目标选择 */
    ItemClicked(_pickedCharacter: character) { }

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
        this.ItemClicked = (clickedItem: character) => {
            clickedItem.HP -= RPGCore.NornamAct(this.ge.fightStatus.currentActionCharater, clickedItem);
            this.ge.fightStatus.ActionDone();
            this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
            this.ItemClicked = (_clickedItem: character) => { }
        }
    }

    /**魂技 */
    Skill() {
        if (!this.IsFuncAreaAvilible) return;
        this.SkillPickStatus = true;
        this.Message = "请选择一个魂技";
    }

    ExcuteSkill(Skill: SkillInfo) {
        console.log("发动魂技:" + Skill.Name);
        console.log("Range:" + Skill.Range);
        console.log("Direct:" + Skill.Direct);
        this.ge.fightStatus.currentActionCharater.MP -= Skill.MpUsage;
        Skill.CurrentColdDown = Skill.ColdDownTurn + 1; //本轮结束会自动减1，所以这里额外加1
        this.SkillPickStatus = false;
        //武魂融合技
        if (Skill.Combine !== undefined) {
            Skill.Combine.forEach(
                c => {
                    this.ge.fightStatus.TurnList = this.ge.fightStatus.TurnList.map(x => x.Name === c ? undefined : x);
                }
            )
        }

        //根据不同的技能对象确定是否要选择技能的受体
        switch (Skill.Range) {
            case enmRange.Self:
                //对自己使用的技能
                Skill.Excute(this.ge.fightStatus.currentActionCharater, this.ge.fightStatus);
                this.ge.fightStatus.ActionDone();
                this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
                break;
            case enmRange.PickOne:
                this.Message = "请选择一个人发动魂技";
                this.SkillRolePickStatus = true;
                switch (Skill.Direct) {
                    case enmDirect.Enemy:
                        //敌人全体
                        this.ItemClicked = (clickedItem: character) => {
                            if (!clickedItem.IsMyTeam) {
                                Skill.Excute(clickedItem, this.ge.fightStatus);
                                this.SkillRolePickStatus = false;
                                this.ge.fightStatus.ActionDone();
                                this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
                                this.ItemClicked = (_clickedItem: character) => { }
                            }
                        }
                        break;
                    case enmDirect.MyTeam:
                        //我军全体
                        this.ItemClicked = (clickedItem: character) => {
                            if (clickedItem.IsMyTeam) {
                                Skill.Excute(clickedItem, this.ge.fightStatus);
                                this.SkillRolePickStatus = false;
                                this.ge.fightStatus.ActionDone();
                                this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
                                this.ItemClicked = (_clickedItem: character) => { }
                            }
                        }
                        break;
                    default:
                        //战场全体
                        this.ItemClicked = (clickedItem: character) => {
                            Skill.Excute(clickedItem, this.ge.fightStatus);
                            this.SkillRolePickStatus = false;
                            this.ge.fightStatus.ActionDone();
                            this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
                            this.ItemClicked = (_clickedItem: character) => { }
                        }
                        break;
                }
                break;
            case enmRange.EveryOne:
                //TODO:对于所有人都使用的技能
                switch (Skill.Direct) {
                    case enmDirect.Enemy:
                        //敌人全体
                        this.ge.fightStatus.Enemy.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.ge.fightStatus);
                        });
                        break;
                    case enmDirect.MyTeam:
                        //我军全体
                        this.ge.fightStatus.MyTeam.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.ge.fightStatus);
                        });
                        break;
                    default:
                        //战场全体
                        this.ge.fightStatus.MyTeam.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.ge.fightStatus);
                        });
                        this.ge.fightStatus.Enemy.forEach(element => {
                            if (element !== undefined) Skill.Excute(element, this.ge.fightStatus);
                        });
                        break;
                }
                this.ge.fightStatus.ActionDone();
                this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
                break;
            default:
                break;
        }
    }

    ReturnFormSkillPicker() {
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
        this.SkillPickStatus = false;
    }

    //道具
    Tool() {
        if (!this.IsFuncAreaAvilible) return;
        this.ToolPickStatus = true;
        this.Message = "请选择一个道具";
    }
    UseTool(name: string) {
        this.ToolPickStatus = false;
        let t = this.ge.getTool(name);
        this.ExcuteSkill(t.Func);   //ExcuteSkill已经包含了ActionDone！
        this.ge.bagMgr.changeTool([t.Name, -1]);
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
    }
    ReturnFormToolPicker() {
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
        this.ToolPickStatus = false;
    }

    //防御
    Defence() {
        if (!this.IsFuncAreaAvilible) return;
        this.ge.fightStatus.currentActionCharater.IsDefStatus = true;
        this.ge.fightStatus.ActionDone();
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
    }

    //测试用:模拟胜利
    Exit() {
        console.log("jump to scene");
        SceneMgr.lineIdx++;
        this.router.navigateByUrl("scene");
    }

    //测试用:状态的改变
    SkillTest() {
        SkillCreator.碧磷紫毒().Excute(this.ge.fightStatus.MyTeam[0], this.ge.fightStatus);
    }

}