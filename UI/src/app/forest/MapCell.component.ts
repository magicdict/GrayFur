import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapItem, enmMapType } from '../Creator/MapCreator';
import { ResourceMgr } from '../Core/ResourceMgr';


@Component({
    selector: 'map-cell',
    templateUrl: './MapCell.component.html',
})
export class MapCellComponent {
    constructor() { }
    @Input() Item: MapItem;
    @Input() ColIdx: number = 0;
    @Input() RowIdx: number = 0;
    @Output() cellClicked: EventEmitter<MapCellComponent> = new EventEmitter();
    get ImageName(): string {
        if (this.Item.IsRolePosition) {
            return "assets/character/唐三/头像.jpg"
        }
        if (this.Item.IsVisiable) {
            if (this.Item.MapType === enmMapType.Empty) {
                if (this.Item.IsVisited) {
                    return ResourceMgr.img_land_visited;
                } else {
                    return ResourceMgr.img_land_unvisited;
                }
            }
            if (this.Item.MapType === enmMapType.Tree) {
                return ResourceMgr.img_tree;
            }
            if (this.Item.MapType === enmMapType.Transfer) {
                return ResourceMgr.icon_box_transfer;
            }
            if (this.Item.MapType === enmMapType.Treasure) {
                if (this.Item.IsVisited) {
                    return ResourceMgr.icon_box_open;
                } else {
                    return ResourceMgr.icon_box_close;
                }
            }
            if (this.Item.MapType === enmMapType.Monster) {
                if (this.Item.IsVisited) {
                    return ResourceMgr.img_land_visited;
                } else {
                    return "assets/character/" + this.Item.MonsterName + "/头像.jpg"
                }
            }
            if (this.Item.MapType === enmMapType.GoldCoin) {
                if (this.Item.IsVisited) {
                    return ResourceMgr.img_land_visited;
                } else {
                    return ResourceMgr.icon_coin;
                }
            }
        } else {
            return ResourceMgr.img_question;
        }
    }
    CellClicked() {
        this.cellClicked.emit(this);
    }
}