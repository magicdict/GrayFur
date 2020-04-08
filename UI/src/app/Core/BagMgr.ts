import { Injectable } from '@angular/core';

@Injectable()
export class BagMgr {
    Money: number;  //需要在HTML中使用，这里用非静态比较好
    /**道具 */
    toolbag: Array<[string, number]> = new Array<[string, number]>();
    getToolHoldCnt(name: string): number {
        let t = this.toolbag.find(x => x[0] === name);
        return (t === undefined) ? 0 : t[1];
    }
    changeTool(ToolWithCnt: [string, number]) {
        let t = this.toolbag.find(x => x[0] === ToolWithCnt[0])
        if (t === undefined) {
            //不存在的情况
            this.toolbag.push(ToolWithCnt);
        } else {
            ToolWithCnt[1] += t[1];
            this.toolbag = this.toolbag.filter(x => x[0] !== ToolWithCnt[0]);
            this.toolbag.push(ToolWithCnt);
        }
        //使用完了，则从背包中删除掉
        this.toolbag = this.toolbag.filter(x => x[1] > 0);
    }
}