import { Circle, enmCircleYear } from '../Modal/Circle';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';

export class CircleCreator {
    /**唐三 */
    public static 唐三(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.缠绕();
        c1.Monster = "曼陀罗蛇";
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.寄生();
        c2.Monster = "鬼藤";
        circles.push(c2);

        let c3 = new Circle();
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.蛛网束缚_单体();
        c3.SecondSkill = CircleSkillCreator.蛛网束缚_群体();
        c3.Monster = "人面魔蛛";
        circles.push(c3);

        let c4 = new Circle();
        c4.year = enmCircleYear.百年魂环;
        c4.FirstSkill = CircleSkillCreator.蓝银囚笼();
        c4.SecondSkill = CircleSkillCreator.蓝银突刺阵();
        c4.Monster = "地穴魔蛛";
        circles.push(c4);

        let c5 = new Circle();
        c5.year = enmCircleYear.百年魂环;
        c5.FirstSkill = CircleSkillCreator.蓝银霸王枪();
        c5.Monster = "蓝银皇天赋魂环";
        circles.push(c5);
        return circles;
    }

    /**小舞 */
    public static 小舞(): Circle[] {
        let circles: Circle[] = [];
        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.腰弓();
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.魅惑();
        circles.push(c2);
        return circles;
    }

    /**戴沐白 */
    public static 戴沐白(): Circle[] {
        let circles: Circle[] = [];
        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.白虎护身障();
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.白虎烈光波();
        circles.push(c2);

        let c3 = new Circle();
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.白虎金刚变();
        c3.Monster = "白虎";
        circles.push(c3);

        let c4 = new Circle();
        c4.year = enmCircleYear.百年魂环;
        c4.FirstSkill = CircleSkillCreator.白虎流星雨();
        c4.Monster = "白虎";
        circles.push(c4);

        return circles;
    }

    /**宁荣荣魂环 */
    public static 宁荣荣(): Circle[] {
        let circles: Circle[] = [];
        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.力量增益();
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.敏捷增幅();
        circles.push(c2);

        let c3 = new Circle();
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.魂力增幅();
        circles.push(c3);

        let c4 = new Circle();
        c4.year = enmCircleYear.百年魂环;
        c4.FirstSkill = CircleSkillCreator.防御增幅();
        circles.push(c4);

        let c5 = new Circle();
        c5.year = enmCircleYear.百年魂环;
        c5.FirstSkill = CircleSkillCreator.攻击增幅();
        circles.push(c5);

        return circles;
    }

    /**朱竹清魂环 */
    public static 朱竹清(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.幽冥突刺();
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.幽冥百爪();
        circles.push(c2);

        let c3 = new Circle();
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.幽冥斩();
        circles.push(c3);

        return circles;
    }
}