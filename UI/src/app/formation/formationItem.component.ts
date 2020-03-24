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

    get StatusTitle(): string {
        if (this.Item.BufferStatusList.length == 0) return undefined;
        let s = "";
        this.Item.BufferStatusList.forEach(element => {
            switch (element.Status) {
                case characterStatus.魂技:
                    s += "技";
                    break;
                case characterStatus.中毒:
                    s += "毒"
                    break;
                case characterStatus.浴火凤凰:
                    s += "火"
                    break;
                case characterStatus.束缚:
                    s += "缚"
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