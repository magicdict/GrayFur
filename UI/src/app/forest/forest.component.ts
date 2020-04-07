import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';
import { My2DArray } from '../Lib/My2DArray';
import { MapItem, ForestSys } from '../Core/ForestSys';
import { MapCellComponent } from './MapCell.component';



@Component({
    templateUrl: './forest.component.html',
})
export class ForestComponent implements OnInit {
    constructor(private ge: GameEngine,
        private router: Router,
    ) {
        this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    ngOnInit(): void {
        this.PullzeArray = new My2DArray<MapItem>(9, 7, new MapItem(), true);
        ForestSys.Init(this.PullzeArray);
    }
    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    PullzeArray: My2DArray<MapItem>;
    /**角色位置 */
    RolePosition: [number, number];

    CellClicker(value: MapCellComponent) {

    }
    Exit() {
        console.log("jump to scene")
        this.router.navigateByUrl("scene");
    }

}