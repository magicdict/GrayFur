import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { character, characterStatus } from '../Modal/character';
import { IconMgr } from '../Core/IconMgr';

@Component({
    selector: 'app-formationItem',
    templateUrl: './formationItem.component.html',
})
export class FormationItemComponent implements OnInit {
    constructor() { }

    @Input() Item: character;

    @Output() ItemClickedEmit: EventEmitter<character> = new EventEmitter();

    get StatusIcon(): Array<string> {
        if (this.Item.BufferList.length == 0) return undefined;
        let s = new Array<string>();
        this.Item.StatusList.forEach(element => {
            switch (element) {
                case characterStatus.魂技:
                    s.push(IconMgr.icon_skill);
                    break;
                case characterStatus.中毒:
                    s.push(IconMgr.icon_poison);
                    break;
                case characterStatus.浴火凤凰:
                    s.push(IconMgr.icon_fire);
                    break;
                case characterStatus.束缚:
                    s.push(IconMgr.icon_block);
                    break;
                case characterStatus.生命增益:
                    s.push(IconMgr.icon_hp);
                    break;
                case characterStatus.速度增益:
                    s.push(IconMgr.icon_speed);
                    break;
                case characterStatus.防御增益:
                    s.push(IconMgr.icon_defence);
                    break;
                case characterStatus.魂力增益:
                    s.push(IconMgr.icon_skill);
                    break;
                case characterStatus.攻击增益:
                    s.push(IconMgr.icon_attact);
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