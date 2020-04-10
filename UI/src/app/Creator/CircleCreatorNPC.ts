import { Circle, enmCircleYear } from '../Modal/Circle';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';

export class CircleCreatorNPC {
    
    public static 独孤雁(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.碧磷红毒();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.碧磷蓝毒();
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.千年魂环;
        c3.FirstSkill = CircleSkillCreator.碧磷紫毒();
        circles.push(c3);
        return circles;
    }

    public static 独孤博(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.碧磷红毒();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 2;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.碧磷蓝毒();
        circles.push(c2);

        let c3 = new Circle();
        c3.Order = 3;
        c3.year = enmCircleYear.千年魂环;
        c3.FirstSkill = CircleSkillCreator.碧磷迷魂阵();
        circles.push(c3);

        let c5 = new Circle();
        c5.Order = 5;
        c5.year = enmCircleYear.千年魂环;
        c5.FirstSkill = CircleSkillCreator.蛇蟒天罡盾();
        circles.push(c5);
        

        return circles;
    }

    public static 赵无极(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.不动明王身();
        circles.push(c1);

        return circles;
    }

    public static 叶泠泠(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.范围性全体治疗();
        circles.push(c1);

        return circles;
    }

    public static 玉小刚(): Circle[] {
        let circles: Circle[] = [];

        let c1 = new Circle();
        c1.Order = 1;
        c1.year = enmCircleYear.百年魂环;
        c1.FirstSkill = CircleSkillCreator.放屁如打雷_轰天裂地罗三炮();
        circles.push(c1);

        let c2 = new Circle();
        c2.Order = 1;
        c2.year = enmCircleYear.百年魂环;
        c2.FirstSkill = CircleSkillCreator.放屁如烟雾_催眠沉睡罗三炮();
        circles.push(c2);

        return circles;
    }
    
}