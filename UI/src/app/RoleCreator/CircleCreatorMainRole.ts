import { Circle, enmCircleYear } from '../Modal/Circle';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';

export class CircleCreatorMainRole {
    /**唐三 */
    public static 唐三_0(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.缠绕();
        c1.Source = "曼陀罗蛇";
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.寄生();
        c2.Source = "鬼藤";
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.千年魂环;
        c3.FirstSkill = CircleSkillCreator.蛛网束缚_单体();
        c3.SecondSkill = CircleSkillCreator.蛛网束缚_群体();
        c3.Source = "人面魔蛛";
        circles.push(c3);

        let c4 = new Circle();
        c4.Order = 4;
        c4.year = enmCircleYear.万年魂环;
        c4.FirstSkill = CircleSkillCreator.蓝银囚笼();
        c4.SecondSkill = CircleSkillCreator.蓝银突刺阵();
        c4.Source = "地穴魔蛛";
        circles.push(c4);

        let c5 = new Circle();
        c5.Order = 5;
        c5.year = enmCircleYear.万年魂环;
        c5.FirstSkill = CircleSkillCreator.蓝银霸王枪();
        c5.Source = "本命魂环";
        circles.push(c5);

        let c6 = new Circle();
        c6.Order = 6;
        c6.year = enmCircleYear.十万年魂环;
        c6.FirstSkill = CircleSkillCreator.虚无();
        c6.SecondSkill = CircleSkillCreator.爆杀八段摔();
        c6.Source = "小舞献祭";
        circles.push(c6);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        let c8 = new Circle();
        c8.Order = 8;
        c8.year = enmCircleYear.十万年魂环;
        c8.FirstSkill = CircleSkillCreator.未现实魂技("蓝银邪魔镜之灭");
        c8.SecondSkill = CircleSkillCreator.未现实魂技("蓝银虎鲸魔之摄");
        circles.push(c8);

        let c9 = new Circle();
        c9.Order = 9;
        c9.year = enmCircleYear.十万年魂环;
        c9.FirstSkill = CircleSkillCreator.未现实魂技("蓝银天青龙之魂");
        c9.SecondSkill = CircleSkillCreator.未现实魂技("蓝银青龙缠之韧");
        circles.push(c9);

        let c10 = new Circle();
        c10.Order = 10;
        c10.year = enmCircleYear.十万年魂环;
        c10.SecondSkill = CircleSkillCreator.未现实魂技("海神神技");
        circles.push(c10);

        return circles;
    }

    public static 唐三_1(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.泰坦之锤();
        c1.SecondSkill = CircleSkillCreator.大地之力();
        c1.Source = "泰坦巨猿";
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.百年魂环;
        circles.push(c3);

        let c4 = new Circle();
        c4.Order = 4;
        c4.year = enmCircleYear.千年魂环;
        circles.push(c4);

        let c5 = new Circle();
        c5.Order = 5;
        c5.year = enmCircleYear.万年魂环;
        circles.push(c5);

        let c6 = new Circle();
        c6.Order = 6;
        c6.year = enmCircleYear.万年魂环;
        c6.FirstSkill = CircleSkillCreator.大地蚁皇斩();
        c6.Source = "千钧蚁皇";
        circles.push(c6);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        let c8 = new Circle();
        c8.Order = 8;
        c8.year = enmCircleYear.十万年魂环;
        c8.FirstSkill = CircleSkillCreator.千钧壁垒();
        circles.push(c8);

        let c9 = new Circle();
        c9.Order = 9;
        c9.year = enmCircleYear.十万年魂环;
        c9.FirstSkill = CircleSkillCreator.未现实魂技("未知");
        circles.push(c9);

        return circles;
    }

    /**小舞 */
    public static 小舞(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.腰弓();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.魅惑();
        circles.push(c2);


        let c6 = new Circle();
        c6.Order = 6;
        c6.year = enmCircleYear.十万年魂环;
        c6.FirstSkill = CircleSkillCreator.虚无();
        c6.SecondSkill = CircleSkillCreator.爆杀八段摔();
        circles.push(c6);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        return circles;
    }

    /**戴沐白 */
    public static 戴沐白(): Circle[] {
        let circles: Circle[] = [];
        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.Order = 1;
        c1.FirstSkill = CircleSkillCreator.白虎护身障();
        circles.push(c1);

        let c2 = new Circle();
        c2.year = enmCircleYear.百年魂环;
        c2.Order = 2;
        c2.FirstSkill = CircleSkillCreator.白虎烈光波();
        circles.push(c2);

        let c3 = new Circle();
        c3.year = enmCircleYear.百年魂环;
        c3.Order = 3;
        c3.FirstSkill = CircleSkillCreator.白虎金刚变();
        c3.Source = "白虎";
        circles.push(c3);

        let c4 = new Circle();
        c4.year = enmCircleYear.百年魂环;
        c4.Order = 4;
        c4.FirstSkill = CircleSkillCreator.白虎流星雨();
        c4.Source = "白虎";
        circles.push(c4);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        return circles;
    }

    /**马红俊、马小桃 魂环 */
    public static 凤凰家族共用(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.year = enmCircleYear.百年魂环;
        c1.Order = 1;
        c1.FirstSkill = CircleSkillCreator.凤凰火线();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.浴火凤凰();
        circles.push(c2);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        return circles;
    }

    /**宁荣荣魂环 */
    public static 宁荣荣(): Circle[] {
        let circles: Circle[] = [];
        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.力量增益();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.敏捷增幅();
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.魂力增幅();
        circles.push(c3);

        let c4 = new Circle();
        c4.Order = 4;
        c4.year = enmCircleYear.百年魂环;
        c4.FirstSkill = CircleSkillCreator.防御增幅();
        circles.push(c4);

        let c5 = new Circle();
        c5.Order = 5;
        c5.year = enmCircleYear.百年魂环;
        c5.FirstSkill = CircleSkillCreator.攻击增幅();
        circles.push(c5);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);
        return circles;
    }

    /**朱竹清魂环 */
    public static 朱竹清(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.幽冥突刺();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.幽冥百爪();
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.百年魂环;
        c3.FirstSkill = CircleSkillCreator.幽冥斩();
        circles.push(c3);

        let c7 = new Circle();
        c7.Order = 7;
        c7.year = enmCircleYear.十万年魂环;
        c7.FirstSkill = CircleSkillCreator.武魂真身();
        circles.push(c7);

        return circles;
    }
}