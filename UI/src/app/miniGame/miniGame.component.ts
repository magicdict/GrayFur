import { Component, OnInit } from '@angular/core';
import { My2DArray } from '../Lib/My2DArray';
import { GameCellComponent, MiniGameCardStatus } from './GameCell.component';
import { Random } from '../Lib/Random';
import { Router } from '@angular/router';


@Component({
    templateUrl: './miniGame.component.html',
})
export class MiniGameComponent implements OnInit {
    constructor(private router: Router) { }

    CellNumber = 6;

    firstCellRef: GameCellComponent;
    secondCellRef: GameCellComponent;

    ShowStatus = MiniGameCardStatus.Show;
    HideStatus = MiniGameCardStatus.Hide;
    ClearStatus = MiniGameCardStatus.Clear;

    //2维数组
    PullzeArray: My2DArray<string> = new My2DArray<string>(6, 6, "唐三");
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
        for (let R = 0; R < 6; R++) {
            for (let C = 0; C < 6; C++) {
                this.PullzeArray.setValue(R, C, AllNames[idx]);
                idx += 1;
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
        if (value.Status === MiniGameCardStatus.Hide) {
            value.Status = MiniGameCardStatus.Show;
        } else {
            return;
        }
        this.StepUsage++;
        if (this.firstCellRef === undefined && this.secondCellRef === undefined) {
            //两个都不存在的 
            this.firstCellRef = value;
        } else {
            if (this.firstCellRef !== undefined && this.secondCellRef === undefined) {
                //前一个有 ，后一个 没有
                this.secondCellRef = value;
                //看一下是不是匹配
                if (this.firstCellRef.ImageName === this.secondCellRef.ImageName) {
                    //匹配
                    setTimeout(() => {
                        this.firstCellRef.Status = MiniGameCardStatus.Clear;
                        this.secondCellRef.Status = MiniGameCardStatus.Clear;
                        this.firstCellRef = undefined;
                        this.secondCellRef = undefined;
                        this.ClearCnt += 2;
                        if (this.ClearCnt == 36) {
                            alert("Completed!!!")
                        }
                    }, 300);
                } else {
                    //不匹配
                    this.firstCellRef.Status = MiniGameCardStatus.Hide;
                    this.firstCellRef = value;
                    this.secondCellRef = undefined;
                }
            }
        }
    }
    Exit() {
        this.router.navigateByUrl("login");
    }
}