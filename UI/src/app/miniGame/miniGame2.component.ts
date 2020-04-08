import { Component, OnInit } from '@angular/core';
import { My2DArray } from '../Lib/My2DArray';
import { GameCellComponent, MiniGameCardStatus } from './GameCell.component';
import { Random } from '../Lib/Random';
import { Router } from '@angular/router';
import { GameData, GameElement, ConnectLogic } from './ConnectLogic';


@Component({
    templateUrl: './miniGame2.component.html',
})
export class MiniGame2Component implements OnInit {
    constructor(private router: Router) { }

    CellRowNumber = 6;
    CellColNumber = 6;

    firstCellRef: GameCellComponent;
    secondCellRef: GameCellComponent;

    ShowStatus = MiniGameCardStatus.Show;
    HideStatus = MiniGameCardStatus.Hide;
    ClearStatus = MiniGameCardStatus.Clear;

    //2维数组
    PullzeArray: My2DArray<string> = new My2DArray<string>(6, 6, "唐三", false);
    ClearCnt = 0;
    //使用步数
    StepUsage = 0;
    ngOnInit(): void {
        let Names = ["唐三", "小舞", "戴沐白",
            "奥斯卡", "马红俊", "宁荣荣",
            "朱竹清", "赵无极", "比比东"];
        let AllNames = new Array();
        // 36格子  9个角色，每人4格 
        for (let index = 0; index < 4; index++) {
            Names.forEach(name => {
                AllNames.push(name);
            });
        }
        this.getArrRandomly(AllNames);
        var idx = 0;
        GameData.maxRow = this.CellRowNumber + 2;
        GameData.maxColumn = this.CellColNumber + 2;
        for (let R = 0; R < 6; R++) {
            for (let C = 0; C < 6; C++) {
                this.PullzeArray.setValue(R, C, AllNames[idx]);
                idx += 1;
            }
        }

        idx = 0;
        for (let i = 0; i < GameData.maxRow; i++) {
            for (let j = 0; j < GameData.maxColumn; j++) {
                let id = i + GameData.maxRow * j
                if (i == 0 || j == 0 || i == (GameData.maxRow - 1) || j == (GameData.maxColumn - 1)) {
                    GameData.elements[id] = new GameElement(id, "Empty");
                    GameData.mapData[id] = 0;
                } else {
                    GameData.elements[id] = new GameElement(id, AllNames[idx]);
                    GameData.mapData[id] = 1;
                    idx++;
                }
            }
        }

        this.ClearCnt = 0;
    }

    getArrRandomly(arr: Array<string>) {
        var len = arr.length;
        //首先从最小的数开始遍历，之后递增
        for (var i = 0; i < len; i++) {
            //这里一定要注意，后面不管是（i+1）还是（len-i），它们是时变的。
            var randomIndex = Math.floor(Random.value * (len - i));
            var itemAtIndex = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = itemAtIndex;
        }
    }


    CellClicker(value: GameCellComponent) {
        console.log("CellClicker");
        if (this.firstCellRef === undefined && this.secondCellRef === undefined) {
            //两个都不存在的 
            this.firstCellRef = value;
            this.firstCellRef.Status = MiniGameCardStatus.Selected;
        } else {
            if (this.firstCellRef !== undefined && this.secondCellRef === undefined) {
                //前一个有 ，后一个没有，则开始判断
                this.secondCellRef = value;
                this.secondCellRef.Status = MiniGameCardStatus.Selected;
                this.StepUsage++;
                //看一下是不是匹配
                if (this.IsLinked()) {
                    //匹配
                    this.firstCellRef.Status = MiniGameCardStatus.Clear;
                    this.secondCellRef.Status = MiniGameCardStatus.Clear;
                    this.firstCellRef = undefined;
                    this.secondCellRef = undefined;
                    this.ClearCnt += 2;
                    if (this.ClearCnt == 36) {
                        alert("Completed!!!")
                    }
                } else {
                    //不匹配
                    this.firstCellRef.Status = MiniGameCardStatus.Show;
                    this.secondCellRef.Status = MiniGameCardStatus.Show;
                    this.firstCellRef = undefined;
                    this.secondCellRef = undefined;
                }
            }
        }
    }

    IsLinked(): boolean {
        var el1: GameElement = GameData.elements.find(x => x.locationX == this.firstCellRef.RowIdx + 1 && x.locationY === this.firstCellRef.ColIdx + 1);
        var el2: GameElement = GameData.elements.find(x => x.locationX == this.secondCellRef.RowIdx + 1 && x.locationY === this.secondCellRef.ColIdx + 1);
        let r = ConnectLogic.getPath(el1, el2);
        if (r) {
            GameData.mapData[el1.id] = 0;
            GameData.mapData[el2.id] = 0;
        }
        return r;
    }

    Exit() {
        this.router.navigateByUrl("login");
    }
}

