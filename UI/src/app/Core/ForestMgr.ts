import { My2DArray } from '../Lib/My2DArray';
import { MapCreator, MapItem, enmMapType } from '../Creator/MapCreator';

/**星斗大森林 */
export class ForestMgr {

    public static MazeArray: My2DArray<MapItem>;
    /**角色位置 */
    public static RoleRowIdx = 8;
    public static RoleColIdx = 3;
    public static RowCnt = 9;
    public static ColCnt = 7;

    public static InitWithTree() {
        let BaseMapItem = new MapItem();
        BaseMapItem.IsVisited = false;
        BaseMapItem.MapType = enmMapType.Tree;
        ForestMgr.MazeArray = new My2DArray<MapItem>(ForestMgr.RowCnt, ForestMgr.ColCnt, BaseMapItem, true);
    }

    public static InitFirst() {
        //使用树的基底
        ForestMgr.InitWithTree();

        for (let r = 0; r < ForestMgr.RowCnt; r++) {
            for (let c = 0; c < ForestMgr.ColCnt; c++) {
                ForestMgr.MazeArray.getValue(r, c).ColIdx = c;
                ForestMgr.MazeArray.getValue(r, c).RowIdx = r;
            }
        }
        let MapInfo = MapCreator.FirstFloor();
        MapInfo.forEach(
            map => {
                var InitMapCell = ForestMgr.MazeArray.getValue(map.RowIdx, map.ColIdx);
                InitMapCell = Object.assign(InitMapCell, map);
            }
        )
        var RoleMapCell = ForestMgr.MazeArray.getValue(ForestMgr.RoleRowIdx, ForestMgr.RoleColIdx);
        RoleMapCell.IsVisited = true;
        RoleMapCell.IsRolePosition = true;
        ForestMgr.SetVisiable(ForestMgr.MazeArray, RoleMapCell)
    }



    public static SetVisiable(Map: My2DArray<MapItem>, RoleMapCell: MapItem) {
        let ColIdx = RoleMapCell.ColIdx;
        let RowIdx = RoleMapCell.RowIdx;
        RoleMapCell.IsVisiable = true;
        //上下左右四格都设定为IsVisible = True
        var UP = Map.getValue(RowIdx - 1, ColIdx);
        if (UP !== null) UP.IsVisiable = true;
        var Down = Map.getValue(RowIdx + 1, ColIdx);
        if (Down !== null) Down.IsVisiable = true;
        var LEFT = Map.getValue(RowIdx, ColIdx - 1);
        if (LEFT !== null) LEFT.IsVisiable = true;
        var Right = Map.getValue(RowIdx, ColIdx + 1);
        if (Right !== null) Right.IsVisiable = true;
    }
}