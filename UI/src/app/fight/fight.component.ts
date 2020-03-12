import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character } from '../module/character';
import { getBattleInfoByName } from '../module/BattleInfo';



@Component({
    templateUrl: './fight.component.html',
})
export class FightComponent implements OnInit {
    constructor(public ge: GameEngine,
        private router: Router,
    ) { }

    Enemy: character[];
    MyTeam: character[];

    ngOnInit(): void {
        let battleinfo = getBattleInfoByName(this.ge.status.fightname)
        this.Enemy = battleinfo.Enemy.map(x=>this.ge.GetRoleByName(x));
        this.MyTeam = battleinfo.MyTeam.map(x=>this.ge.GetRoleByName(x));
    }
    Exit() {
        console.log("jump to scene");
        this.ge.status.lineIdx++;
        this.router.navigateByUrl("scene");
    }
}