import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapCellComponent } from './MapCell.component';
import { enmMapType, MapCreator } from '../Creator/MapCreator';
import { ToastService } from '../toasts/toast-service';
import { BagMgr } from '../Core/BagMgr';
import { ForestMgr } from '../Core/ForestMgr';


@Component({
    templateUrl: './forest.component.html',
})
export class ForestComponent {
    constructor(
        private bagMgr: BagMgr,
        private forestMgr: ForestMgr,
        private router: Router,
        public toastService: ToastService,
    ) {
        this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    MazeInfo = this.forestMgr.CurrentMazeInfo;
    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    CellClicker(value: MapCellComponent) {
        //无法穿越树林
        if (value.Item.MapType === enmMapType.Tree) return;
        if (Math.abs(this.forestMgr.CurrentRoleRowIdx - value.RowIdx) + Math.abs(this.forestMgr.CurrentRoleColIdx - value.ColIdx) !== 1) return;
        //处理访问事件，且设定为已经访问
        this.forestMgr.CurrentMazeInfo.MazeArray.getValue(this.forestMgr.CurrentRoleRowIdx, this.forestMgr.CurrentRoleColIdx).IsRolePosition = false;
        if (!value.Item.IsVisited && value.Item.MapType === enmMapType.Treasure) {
            this.bagMgr.changeTool([value.Item.ToolName, 1]);
            this.toastService.show("获得宝物：" + value.Item.ToolName, { classname: 'bg-success text-light', delay: 3000 });
        }
        if (!value.Item.IsVisited && value.Item.MapType === enmMapType.GoldCoin) {
            this.bagMgr.Money += value.Item.GoldCoin;
            this.toastService.show("获得金币：" + value.Item.GoldCoin, { classname: 'bg-success text-light', delay: 3000 });
        }
        value.Item.IsVisited = true;
        value.Item.IsRolePosition = true;
        this.forestMgr.CurrentRoleRowIdx = value.RowIdx;
        this.forestMgr.CurrentRoleColIdx = value.ColIdx;
        MapCreator.SetVisiable(this.forestMgr.CurrentMazeInfo.MazeArray, value.Item);
        if (value.Item.MapType === enmMapType.Transfer) {
            let m = this.forestMgr.getMazeInfoByName(value.Item.TransferInfo[0]);
            this.forestMgr.CurrentRoleRowIdx = value.Item.TransferInfo[1];
            this.forestMgr.CurrentRoleColIdx = value.Item.TransferInfo[2];
            let initCell = m.MazeArray.getValue(this.forestMgr.CurrentRoleRowIdx, this.forestMgr.CurrentRoleColIdx);
            initCell.IsRolePosition = true;
            MapCreator.SetVisiable(m.MazeArray, initCell);
            this.forestMgr.RefreshArray(m);
        }
    }
    Exit() {
        console.log("jump to scene")
        this.router.navigateByUrl("scene");
    }
}