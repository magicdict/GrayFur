import { SkillInfo } from './SkillInfo';

/** 道具 */
export class ToolInfo {
    /** 名字 */
    Name: string; 
    /** 价格 */  
    Price:number;   
    /** 道具和技能可以合并 */
    Func: SkillInfo;    
}