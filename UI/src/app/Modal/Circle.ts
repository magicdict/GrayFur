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
        }
    }
    /**魂技 */
    FirstSkill: SkillInfo;
    SecondSkill: SkillInfo;
    /**来源 */
    Monster:string;
}

export enum enmCircleYear {
    十年魂环,
    百年魂环,
    千年魂环,
    万年魂环,
    十万年魂环,
}