import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'minigame-cell',
    templateUrl: './GameCell.component.html',
})
export class GameCellComponent {
    constructor() { }
    @Input() ImageName;
    @Input() Status: MiniGameCardStatus;
    @Input() ColIdx: number = 0;
    @Input() RowIdx: number = 0;
    ShowStatus = MiniGameCardStatus.Show;
    HideStatus = MiniGameCardStatus.Hide;
    ClearStatus = MiniGameCardStatus.Clear;
    SelectedStatus = MiniGameCardStatus.Selected;
    @Output() cellClicked: EventEmitter<GameCellComponent> = new EventEmitter();
    CellClicked() {
        this.cellClicked.emit(this);
    }
    get BackGoundColor(): string {
        switch (this.Status) {
            case MiniGameCardStatus.Selected:
                return "red";
            default:
                return "";
        }
    }
}

/**卡牌状态 */
export enum MiniGameCardStatus {
    /**消除 */
    Clear,
    /**正面 */
    Show,
    /**背面 */
    Hide,
    /**高亮 */
    Selected
}