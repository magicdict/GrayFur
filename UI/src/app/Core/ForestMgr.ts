import { MazeInfo, MapCreator, MapItem } from '../Creator/MapCreator';
import { Injectable } from '@angular/core';
import { My2DArray } from '../Lib/My2DArray';
import { MapCellComponent } from '../forest/MapCell.component';

@Injectable()
/**星斗大森林 */
export class ForestMgr {
    LoadCurrentStatus(MapInitInfo:[string,number,number]) {
        let m = this.getMazeInfoByName(MapInitInfo[0]);
        this.CurrentRoleRowIdx = MapInitInfo[1];
        this.CurrentRoleColIdx = MapInitInfo[2];
        let initCell = m.MazeArray.getValue(this.CurrentRoleRowIdx, this.CurrentRoleColIdx);
        initCell.IsRolePosition = true;
        MapCreator.SetVisiable(m.MazeArray, initCell);
        for (let r = 0; r < MapCreator.RowCnt; r++) {
            for (let c = 0; c < MapCreator.ColCnt; c++) {
                Object.assign(this.CurrentMazeInfo.MazeArray.getValue(r, c), m.MazeArray.getValue(r, c));
            }
        }
        this.CurrentMazeInfo.AreaTitle = m.AreaTitle;
        this.CurrentMazeInfo.Name = m.Name;
    }
    SaveCurrentStatus(){
        let m = this.getMazeInfoByName(this.CurrentMazeInfo.Name);
        for (let r = 0; r < MapCreator.RowCnt; r++) {
            for (let c = 0; c < MapCreator.ColCnt; c++) {
                Object.assign(m.MazeArray.getValue(r, c),this.CurrentMazeInfo.MazeArray.getValue(r, c));
            }
        }
    }

    public static MonsterCell:MapCellComponent;
    public static MonsterVictor(){
        this.MonsterCell.Item.IsVisited = true;
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