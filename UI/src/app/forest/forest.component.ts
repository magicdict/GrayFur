import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { My2DArray } from '../Lib/My2DArray';
import { MapCellComponent } from './MapCell.component';
import { MapItem, enmMapType } from '../Creator/MapCreator';
import { ForestMgr } from '../Core/ForestMgr';
import { ToastService } from '../toasts/toast-service';
import { BagMgr } from '../Core/BagMgr';

@Component({
    templateUrl: './forest.component.html',
})
export class ForestComponent {
    constructor(
        private bagMgr: BagMgr,
        private router: Router,
        public toastService: ToastService
    ) {
        this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    MazeArray = ForestMgr.MazeArray;
    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    CellClicker(value: MapCellComponent) {
        //无法穿越树林
        if (value.Item.MapType === enmMapType.Tree) return;
        if (Math.abs(ForestMgr.RoleRowIdx - value.RowIdx) + Math.abs(ForestMgr.RoleColIdx - value.ColIdx) !== 1) return;
        //处理访问事件，且设定为已经访问
        ForestMgr.MazeArray.getValue(ForestMgr.RoleRowIdx, ForestMgr.RoleColIdx).IsRolePosition = false;
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
        ForestMgr.RoleRowIdx = value.RowIdx;
        ForestMgr.RoleColIdx = value.ColIdx;
        ForestMgr.SetVisiable(ForestMgr.MazeArray, value.Item);
    }
    Exit() {
        console.log("jump to scene")
        this.router.navigateByUrl("scene");
    }
}