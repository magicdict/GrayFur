import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character } from '../module/character';
import { getBattleInfoByName, BattleInfo } from '../module/BattleInfo';
import { SkillInfo, enmRange, enmDirect } from '../module/SkillInfo';



@Component({
    templateUrl: './fight.component.html',
})
export class FightComponent implements OnInit {
    constructor(public ge: GameEngine,
        private router: Router,
    ) { }

    Enemy: character[];
    MyTeam: character[];
    Battle: BattleInfo;
    Message: string = "进入战场";
    SkillPickStatus: boolean;

    ngOnInit(): void {
        this.Battle = getBattleInfoByName(this.ge.status.fightname);
        this.Enemy = this.Battle.Enemy.map(x => this.ge.GetRoleByName(x));
        this.MyTeam = this.Battle.MyTeam.map(x => this.ge.GetRoleByName(x));
        this.ge.InitFightStatus();
    }

    //对象目标选择
    ItemClicked(clickedItem: character) { }

    Attack() {
        console.log("普通攻击");
        this.Message = "请选择一个攻击目标";
        this.ItemClicked = (clickedItem: character) => {
            clickedItem.HP -= 10;
        }
    }

    Skill() {
        //魂技测试
        this.SkillPickStatus = true;
        this.Message = "请选择一个魂技";
    }

    ExcuteSkill(Skill: SkillInfo) {
        console.log("发动魂技:" + Skill.Name);
        console.log("Range:" + Skill.Range);
        console.log("Direct:" + Skill.Direct);

        this.SkillPickStatus = false;
        //根据不同的技能对象确定是否要选择技能的受体
        switch (Skill.Range) {
            case enmRange.Self:
                //对自己使用的技能
                Skill.Excute(this.ge.fightStatus.currentActionCharater);
                break;
            case enmRange.PickOne:
                //选择一个人发动
                this.ItemClicked = (clickedItem: character) => {
                    Skill.Excute(clickedItem);
                }
                break;
            case enmRange.EveryOne:
                //TODO:对于所有人都使用的技能
                switch (Skill.Direct) {
                    case enmDirect.Enemy:
                        //敌人全体
                        break;
                    case enmDirect.MyTeam:
                        //我军全体
                        break;
                    default:
                        //战场全体
                        break;
                }
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

    }

    //防御
    Defence() {
        this.ge.fightStatus.currentActionCharater.IsDefStatus = true;
    }

    //测试用：模拟胜利
    Exit() {
        console.log("jump to scene");
        this.ge.status.lineIdx++;
        this.router.navigateByUrl("scene");
    }

}