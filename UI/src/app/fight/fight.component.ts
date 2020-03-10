import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';


@Component({
    templateUrl: './fight.component.html',
})
export class FightComponent implements OnInit {
    constructor(private ge: GameEngine,
        private router: Router,
    ) { }

    ngOnInit(): void {

    }
}