import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MiniGameCardStatus } from './miniGame.component';


@Component({
    selector: 'minigame-cell',
    templateUrl: './GameCell.component.html',
})
export class GameCellComponent {
    constructor() { }
    @Input() ImageName;
    @Input() Status: MiniGameCardStatus;
    ShowStatus = MiniGameCardStatus.Show;
    HideStatus = MiniGameCardStatus.Hide;
    ClearStatus = MiniGameCardStatus.Clear;
    @Output() cellClicked: EventEmitter<GameCellComponent> = new EventEmitter();
    ChangeStatus() {
        switch (this.Status) {
            case MiniGameCardStatus.Hide:
                this.Status = MiniGameCardStatus.Show;
                setTimeout(() => { this.cellClicked.emit(this); }, 300);
                break;
            default:
                break;
        }
    }
}