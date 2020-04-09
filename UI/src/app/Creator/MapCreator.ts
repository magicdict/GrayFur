import { ToolCreator } from './ToolCreator';
import { My2DArray } from '../Lib/My2DArray';


export class MapCreator {
    /**地图大小 */
    public static RowCnt = 9;
    public static ColCnt = 7;
    /**角色位置 */
    public static RoleInitRowIdx = 8;
    public static RoleInitColIdx = 3;

    public static CreateEmptyCell(rowidx: number, colidx: number): MapItem {
        var mapitem = new MapItem();
        mapitem.RowIdx = rowidx;
        mapitem.ColIdx = colidx;
        mapitem.MapType = enmMapType.Empty;
        return mapitem;
    }
    public static CreateTreasureCell(rowidx: number, colidx: number, toolName: string): MapItem {
        var mapitem = new MapItem();
        mapitem.RowIdx = rowidx;
        mapitem.ColIdx = colidx;
        mapitem.MapType = enmMapType.Treasure;
        mapitem.ToolName = toolName;
        return mapitem;
    }
    public static CreateGoldCell(rowidx: number, colidx: number, cnt: number): MapItem {
        var mapitem = new MapItem();
        mapitem.RowIdx = rowidx;
        mapitem.ColIdx = colidx;
        mapitem.MapType = enmMapType.GoldCoin;
        mapitem.GoldCoin = cnt;
        return mapitem;
    }

    public static CreateTransferCell(name: string, rowidx: number, colidx: number): MapItem {
        var mapitem = new MapItem();
        mapitem.RowIdx = rowidx;
        mapitem.ColIdx = colidx;
        mapitem.MapType = enmMapType.Transfer;
        mapitem.TransferInfo = [name, rowidx, colidx];
        return mapitem;
    }

    public static CreateMonsterCell(name: string, rowidx: number, colidx: number): MapItem {
        var mapitem = new MapItem();
        mapitem.RowIdx = rowidx;
        mapitem.ColIdx = colidx;
        mapitem.MapType = enmMapType.Monster;
        mapitem.MonsterName = name;
        return mapitem;
    }

    public static InitWithTree(): My2DArray<MapItem> {
        let BaseMapItem = new MapItem();
        BaseMapItem.IsVisited = false;
        BaseMapItem.MapType = enmMapType.Tree;
        return new My2DArray<MapItem>(this.RowCnt, this.ColCnt, BaseMapItem, true);
    }

    public static InitArea(areaName: string, areaTitle: string, createFunc: () => MapItem[]): MazeInfo {
        //使用树的基底
        var area = this.InitWithTree();
        for (let r = 0; r < this.RowCnt; r++) {
            for (let c = 0; c < this.ColCnt; c++) {
                area.getValue(r, c).ColIdx = c;
                area.getValue(r, c).RowIdx = r;
            }
        }
        let MapInfo = createFunc();
        MapInfo.forEach(
            map => {
                var InitMapCell = area.getValue(map.RowIdx, map.ColIdx);
                InitMapCell = Object.assign(InitMapCell, map);
            }
        )
        return { Name: areaName, AreaTitle: areaTitle, MazeArray: area };
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

    public static BeginnerEntry(): MapItem[] {
        let floor: MapItem[] = [];
        for (let rowidx = 0; rowidx < 9; rowidx++) {
            floor.push(MapCreator.CreateEmptyCell(rowidx, 2));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 3));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 4));
        }
        floor.push(MapCreator.CreateTreasureCell(5, 3, ToolCreator.止血草().Name));
        floor.push(MapCreator.CreateGoldCell(7, 4, 15));
        floor.push(MapCreator.CreateTransferCell("Maze0002", 4, 3));
        return floor;
    }

    public static BeginnerEntry2(): MapItem[] {
        let floor: MapItem[] = [];
        for (let rowidx = 0; rowidx < 3; rowidx++) {
            floor.push(MapCreator.CreateEmptyCell(rowidx, 3));
        }
        for (let rowidx = 3; rowidx < 9; rowidx++) {
            floor.push(MapCreator.CreateEmptyCell(rowidx, 2));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 3));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 4));
        }
        floor.push(MapCreator.CreateTreasureCell(5, 3, ToolCreator.止血草().Name));
        floor.push(MapCreator.CreateGoldCell(7, 4, 15));
        floor.push(MapCreator.CreateTreasureCell(0, 3, ToolCreator.佛怒唐莲().Name));
        floor.push(MapCreator.CreateMonsterCell("达拉崩巴斑得贝迪卜多比鲁翁", 1, 3));
        floor.push(MapCreator.CreateTransferCell("Maze0001", 4, 3));
        return floor;
    }
}

export interface MazeInfo {
    Name: string;
    AreaTitle: string;
    MazeArray: My2DArray<MapItem>;
}

export class MapItem {
    RowIdx: number;
    ColIdx: number;
    IsRolePosition: boolean = false;
    /**可见性 */
    IsVisiable: boolean = false;
    /**已访问 */
    IsVisited: boolean = false;
    MapType: enmMapType = enmMapType.Empty;
    ToolName: string;
    MonsterName: string;
    GoldCoin: number;
    /**传送：地图名，RowIdx，ColIdx */
    TransferInfo: [string, number, number];
}

export enum enmMapType {
    Empty,
    Tree,
    GoldCoin,
    Treasure,
    Monster,
    Recover,
    Transfer
}