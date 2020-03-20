import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';
import { character, characterStatus } from '../Modal/character';



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

    get StatusTitle(): string {
        if (this.Item.Status.length == 0) return undefined;
        switch (this.Item.Status[0][0]) {
            case characterStatus.中毒:
                return "毒"
            case characterStatus.浴火凤凰:
                return "火"
            case characterStatus.束缚:
                return "缚"
            default:
                break;
        }
    }

    ItemClicked() {
        this.ItemClickedEmit.emit(this.Item);
    }
    ngOnInit(): void {

    }
}