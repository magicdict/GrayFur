import { SkillInfo } from './SkillInfo';

/**魂环 */
export class Circle {
    year: enmCircleYear = enmCircleYear.十年魂环;
    get Color(): string {
        switch (this.year) {
            case enmCircleYear.十年魂环:
                return "白";
            case enmCircleYear.百年魂环:
                return "黄";
            case enmCircleYear.千年魂环:
                return "紫";
            case enmCircleYear.万年魂环:
                return "黑";
            case enmCircleYear.十万年魂环:
                return "红";
            case enmCircleYear.百万年魂环:
                return "金";
            case enmCircleYear.特殊:
                return "暗金";
        }
    }
    /**魂环序号 */
    Order: number = 0;
    /**魂技 */
    FirstSkill: SkillInfo;
    /**第二魂技 */
    SecondSkill: SkillInfo;
    /**第三魂技 */
    ThirdSkill: SkillInfo;
    /**第四魂技 */
    ForthSkill: SkillInfo;
    /**来源 */
    Source: string;
}
export enum enmCircleYear {
    十年魂环,
    百年魂环,
    千年魂环,
    万年魂环,
    十万年魂环,
    百万年魂环,
    特殊
}