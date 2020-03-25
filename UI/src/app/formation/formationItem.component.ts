import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { character, characterStatus } from '../Modal/character';



@Component({
    selector: 'app-formationItem',
    templateUrl: './formationItem.component.html',
})
export class FormationItemComponent implements OnInit {
    constructor() { }

    @Input() Item: character;

    @Output() ItemClickedEmit: EventEmitter<character> = new EventEmitter();

    get StatusTitle(): Array<string> {
        if (this.Item.BufferStatusList.length == 0) return undefined;
        let s = new Array<string>();
        this.Item.BufferStatusList.forEach(element => {
            switch (element.Status) {
                case characterStatus.魂技:
                    s.push("I_Book.png");
                    break;
                case characterStatus.中毒:
                    s.push("S_Poison05.png");
                    break;
                case characterStatus.浴火凤凰:
                    s.push("S_Fire03.png");
                    break;
                case characterStatus.束缚:
                    s.push("I_SnailShell.png");
                    break;
                default:
                    break;
            }
        });
        return s;
    }

    

    ItemClicked() {
        this.ItemClickedEmit.emit(this.Item);
    }
    ngOnInit(): void {

    }
}