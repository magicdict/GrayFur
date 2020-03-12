import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character } from '../module/character';


@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
})
export class FormationComponent implements OnInit {
    constructor(private ge: GameEngine,
        private router: Router,
    ) { }

    @Input() Fighterlist: character[];

    //Row1
    R1C1: character = undefined;
    R1C2: character = undefined;
    R1C3: character = undefined;
    R1C4: character = undefined;
    //Row2 
    R2C1: character = undefined;
    R2C2: character = undefined;
    R2C3: character = undefined;
    R2C4: character = undefined;

    ngOnInit(): void {
        this.R1C1 = this.Fighterlist[0];
        this.R1C2 = this.Fighterlist[1];
        this.R1C3 = this.Fighterlist[2];
        this.R1C4 = this.Fighterlist[3];
        this.R2C1 = this.Fighterlist[4];
        this.R2C2 = this.Fighterlist[5];
        this.R2C3 = this.Fighterlist[6];
        this.R2C4 = this.Fighterlist[7];
    }
}