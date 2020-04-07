import { My2DArray } from '../Lib/My2DArray';
import { ToolInfo } from '../Modal/ToolInfo';

/**星斗大森林 */
export class ForestSys {
    public static Init(Map: My2DArray<MapItem>) {
        var InitMapCell = Map.getValue(8, 3);
        InitMapCell.IsVisited = true;
        InitMapCell.MapType = enmMapType.Role;
    }
}

export class MapItem {
    IsVisited: Boolean = false;
    MapType: enmMapType = enmMapType.Empty;
    Tool: ToolInfo;
    Gold: Number;
}

export enum enmMapType {
    Empty,
    Role,
    Tree,
    Gold,
    Treasure,
    Monster,
    Recover
}