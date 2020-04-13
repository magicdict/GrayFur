import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character, characterStatus } from '../Modal/Character';
import { ResourceMgr } from '../Core/ResourceMgr';

@Component({
    selector: 'app-formationItem',
    templateUrl: './formationItem.component.html',
})
export class FormationItemComponent implements OnInit {
    constructor() { }

    @Input() Item: Character;

    @Output() ItemClickedEmit: EventEmitter<Character> = new EventEmitter();

    get StatusIcon(): Array<[string,string]> {
        if (this.Item.BufferList.length == 0) return undefined;
        let s = new Array<[string,string]>();
        this.Item.StatusList.forEach(element => {
            switch (element) {
                case characterStatus.魂技:
                    s.push([ResourceMgr.icon_skill,"blue"]);
                    break;
                case characterStatus.中毒:
                    s.push([ResourceMgr.icon_poison,"red"]);
                    break;
                case characterStatus.浴火凤凰:
                    s.push([ResourceMgr.icon_fire,"blue"]);
                    break;
                case characterStatus.束缚:
                    s.push([ResourceMgr.icon_block,"red"]);
                    break;
                case characterStatus.生命增益:
                    s.push([ResourceMgr.icon_hp,"green"]);
                    break;
                case characterStatus.速度增益:
                    s.push([ResourceMgr.icon_speed,"green"]);
                    break;
                case characterStatus.防御增益:
                    s.push([ResourceMgr.icon_defence,"green"]);
                    break;
                case characterStatus.魂力增益:
                    s.push([ResourceMgr.icon_skill,"green"]);
                    break;
                case characterStatus.攻击增益:
                    s.push([ResourceMgr.icon_attact,"green"]);
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