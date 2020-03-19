import { SkillInfo } from './SkillInfo';

/** 道具 */
export class ToolInfo {
    /** 名字 */
    Name: string;
    /** 价格 */
    Price: number;
    /** 道具和技能可以合并 */
    Func: SkillInfo;

    ToolType: enmToolType = enmToolType.StoreItem;
}

export class HiddenWeapon extends ToolInfo {
    ToolType = enmToolType.HiddenWeapon;
};

export enum enmToolType {
    HiddenWeapon,
    StoreItem,
    Spacial
}