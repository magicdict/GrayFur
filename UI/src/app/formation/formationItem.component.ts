import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character } from '../module/character';



@Component({
    selector: 'app-formationItem',
    templateUrl: './formationItem.component.html',
})
export class FormationItemComponent implements OnInit {
    constructor(private ge: GameEngine,
        private router: Router,
    ) { }

    @Input() Item: character;

    @Output() ItemClickedEmit: EventEmitter<character> = new EventEmitter();
    ItemClicked() {
        this.ItemClickedEmit.emit(this.Item);
    }
    ngOnInit(): void {

    }
}