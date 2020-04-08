import { MazeInfo, MapCreator, MapItem } from '../Creator/MapCreator';
import { Injectable } from '@angular/core';
import { My2DArray } from '../Lib/My2DArray';

@Injectable()
/**星斗大森林 */
export class ForestMgr {
    RefreshArray(m: MazeInfo) {
        for (let r = 0; r < MapCreator.RowCnt; r++) {
            for (let c = 0; c < MapCreator.ColCnt; c++) {
                Object.assign(this.CurrentMazeInfo.MazeArray.getValue(r, c), m.MazeArray.getValue(r, c));
            }
        }
        this.CurrentMazeInfo.AreaTitle = m.AreaTitle;
        this.CurrentMazeInfo.Name = m.Name;
    }
    SaveCurrentStatus(){
        //TODO:当前层的状态回写到MazeInfoList
    }
    CurrentMazeInfo: MazeInfo = {
        AreaTitle: "", Name: "", MazeArray: new My2DArray<MapItem>(MapCreator.RowCnt, MapCreator.ColCnt, new MapItem(),true)
    };
    CurrentRoleColIdx: number;
    CurrentRoleRowIdx: number;
    MazeInfoList: MazeInfo[] = [];

    public getMazeInfoByName(MazeName: string): MazeInfo {
        return this.MazeInfoList.find(x => x.Name === MazeName);
    }
}