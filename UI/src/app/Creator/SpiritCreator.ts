import { Spirit } from '../Modal/Spirit';
import { Circle } from '../Modal/Circle';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';

export class SpiritCreator {

    public static 冰碧帝皇蝎(): Spirit {
        let s = new Spirit();
        s.Name = "冰碧帝皇蝎";
        s.Nickname = "冰帝";
        s.Year = 700_000;

        let c1 = new Circle();
        c1.FirstSkill = CircleSkillCreator.未现实魂技("冰帝之螯");
        s.FirstCircle = c1;

        let c2 = new Circle();
        c2.FirstSkill = CircleSkillCreator.未现实魂技("冰皇护体");
        s.SecondCircle = c2;

        return s;
    }


    public static 冰天雪女(): Spirit {
        let s = new Spirit();
        s.Name = "冰天雪女";
        s.Nickname = "雪帝";
        s.Year = 700_000;

        let c1 = new Circle();
        c1.FirstSkill = CircleSkillCreator.未现实魂技("帝寒天·雪舞耀阳");
        s.FirstCircle = c1;

        let c2 = new Circle();
        c2.FirstSkill = CircleSkillCreator.未现实魂技("帝掌·大寒无雪");
        s.SecondCircle = c2;

        let c3 = new Circle();
        c3.FirstSkill = CircleSkillCreator.未现实魂技("帝剑·冰极无双");
        s.ThirdCircle = c3;

        let c4 = new Circle();
        c4.FirstSkill = CircleSkillCreator.未现实魂技("冰雪二帝之骄傲");
        s.ForthCircle = c4;

        return s;
    }

    public static 八角玄冰草(): Spirit {
        let s = new Spirit();
        s.Name = "八角玄冰草";
        s.Nickname = "八角";
        s.Year = 700_000;

        let c1 = new Circle();
        c1.FirstSkill = CircleSkillCreator.未现实魂技("极限冰增幅");
        s.FirstCircle = c1;

        let c2 = new Circle();
        c2.FirstSkill = CircleSkillCreator.武魂真身();
        s.SecondCircle = c2;

        return s;
    }

    public static 冰熊王(): Spirit {
        let s = new Spirit();
        s.Name = "冰熊王";
        s.Nickname = "小白";
        s.Year = 700_000;

        let c1 = new Circle();
        c1.FirstSkill = CircleSkillCreator.未现实魂技("冰之流星");
        s.FirstCircle = c1;

        let c2 = new Circle();
        c2.FirstSkill = CircleSkillCreator.未现实魂技("冰熊暴风雪");
        s.SecondCircle = c2;

        return s;
    }
}