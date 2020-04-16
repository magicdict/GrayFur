import { enmSpecialSoul } from './EnumAndConst';
import { Circle } from './Circle';
import { Bone } from './Bone';

/**魂灵(绝世唐门) */
export class Spirit {
    /**本体 */
    Name: string;
    /**昵称 */
    Nickname: string;
    /**修为 */
    Year: number;
    /**等级 */
    get Grade(): string {
        if (this.Year <= 100) return "白色魂灵";
        if (this.Year <= 1_000) return "黄色魂灵";
        if (this.Year <= 10_000) return "紫色魂灵";
        if (this.Year <= 10_000) return "黑色魂灵";
        if (this.Year <= 20_000) return "红色魂灵";
        return "橙色魂灵";
    }
    SpecialSoul: enmSpecialSoul = enmSpecialSoul.残次魂灵;
    /**魂环 */
    FirstCircle: Circle;
    /**第二魂环 */
    SecondCircle: Circle;
    /**魂环 */
    ThirdCircle: Circle;
    /**第二魂环 */
    ForthCircle: Circle;
    /**可能掉落魂骨 */
    DropBone: Bone;
}

