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
        if (this.Item.BufferList.length == 0) return undefined;
        let s = new Array<string>();
        this.Item.StatusList.forEach(element => {
            switch (element) {
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

                case characterStatus.生命增益:
                    s.push("S_Holy03.png");
                    break;
                case characterStatus.速度增益:
                    s.push("A_Shoes01.png");
                    break;
                case characterStatus.防御增益:
                    s.push("E_Metal04.png");
                    break;
                case characterStatus.魂力增益:
                    s.push("I_Book.png");
                    break;
                case characterStatus.攻击增益:
                    s.push("W_Dagger001.png");
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