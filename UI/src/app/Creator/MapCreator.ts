import { ToolCreator } from './ToolCreator';


export class MapCreator {
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
    public static FirstFloor(): MapItem[] {
        let floor: MapItem[] = [];
        for (let rowidx = 0; rowidx < 9; rowidx++) {
            floor.push(MapCreator.CreateEmptyCell(rowidx, 2));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 3));
            floor.push(MapCreator.CreateEmptyCell(rowidx, 4));
        }
        floor.push(MapCreator.CreateTreasureCell(5, 3, ToolCreator.止血草().Name));
        floor.push(MapCreator.CreateGoldCell(7, 4, 15));
        return floor;
    }
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
    GoldCoin: number;
}

export enum enmMapType {
    Empty,
    Tree,
    GoldCoin,
    Treasure,
    Monster,
    Recover
}