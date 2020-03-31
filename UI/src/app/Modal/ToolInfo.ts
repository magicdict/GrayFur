import { SkillInfo } from './SkillInfo';

/** 道具 */
export class ToolInfo {
    /** 名字 */
    Name: string;
    /** 图标 */
    Icon: string;
    /** 价格 */
    Price: number;
    /** 道具和技能可以合并 */
    Func: SkillInfo;
    /**道具类型 */
    ToolType: enmToolType = enmToolType.StoreItem;
}

export class HiddenWeapon extends ToolInfo {
    ToolType = enmToolType.HiddenWeapon;
};

export enum enmToolType {
    /**暗器 */
    HiddenWeapon,
    /**可购入的一般道具 */
    StoreItem,
    /**剧情道具 */
    Spacial
}