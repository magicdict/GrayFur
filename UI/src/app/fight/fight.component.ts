import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character } from '../module/character';
import { getBattleInfoByName, BattleInfo } from '../module/BattleInfo';



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
    ngOnInit(): void {
        this.Battle = getBattleInfoByName(this.ge.status.fightname);
        this.Enemy = this.Battle.Enemy.map(x => this.ge.GetRoleByName(x));
        this.MyTeam = this.Battle.MyTeam.map(x => this.ge.GetRoleByName(x));
    }

    ItemClicked(clickedItem: character) {
        //对象目标选择

    }

    Attack() {
        console.log("普通攻击");
        this.Message = "请选择一个攻击目标";
        this.ItemClicked = (clickedItem: character) => {
            clickedItem.HP -= 10;
        }
    }

    Exit() {
        console.log("jump to scene");
        this.ge.status.lineIdx++;
        this.router.navigateByUrl("scene");
    }

    SkillTest() {
        //魂技测试
        this.Message = "请选择一个攻击目标";
        this.ItemClicked = (clickedItem: character) => {
            this.ge.小舞.Skill_A[0].Excute(clickedItem);
        }
        
    }
}