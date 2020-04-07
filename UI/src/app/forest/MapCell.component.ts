import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapItem, enmMapType } from '../Core/ForestSys';

@Component({
    selector: 'map-cell',
    templateUrl: './MapCell.component.html',
})
export class MapCellComponent {
    constructor() { }
    @Input() Status: MapItem;
    @Input() ColIdx: number = 0;
    @Input() RowIdx: number = 0;
    @Output() cellClicked: EventEmitter<MapCellComponent> = new EventEmitter();
    get ImageName(): string {
        if (this.Status.IsVisited) {
            if (this.Status.MapType === enmMapType.Empty) {
                return "assets/Image/land.jpg"
            }
            if (this.Status.MapType === enmMapType.Tree) {
                return "assets/Image/tree.jpg"
            }
            if (this.Status.MapType === enmMapType.Role) {
                return "assets/character/达拉崩巴斑得贝迪卜多比鲁翁/头像.jpg"
            }
        } else {
            return "assets/Image/question.jpg"
        }
    }
    CellClicked() {
        this.cellClicked.emit(this);
    }
}