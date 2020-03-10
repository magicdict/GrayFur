import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';


@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
})
export class FormationComponent implements OnInit {
    constructor(private ge: GameEngine,
        private router: Router,
    ) { }

    @Input() Enemy: boolean;

    ngOnInit(): void {

    }
}