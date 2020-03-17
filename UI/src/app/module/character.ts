import { SkillInfo } from './SkillInfo';

export class character {
    Name: string;   //姓名
    LV: number;      //等级

    MaxHP: number;  //最大生命值
    HP: number;     //生命值
    MaxMP: number;  //最大魔法值（魂力）
    MP: number;         //魔法值（魂力）

    BaseAct: number;     //基础攻击力
    BaseDef: number;     //基础防御力
    Speed:number;                   //速度：出手顺序       

    //战斗状态下使用属性
    IsDefStatus: boolean;           //是否为防御状态
    DefStatusPlus: number = 0.5;    //防御状态下防御力加成    
    Factor: number = 1;             //因子：3成功力的某个角色
    IsMyTeam:boolean;               //角色在战场上是否为我方角色  



    //实时攻击力
    get RealTimeAct(): number {
        return this.BaseAct * this.Factor;
    };
    //实时防御力
    get RealTimeDef(): number {
        var def = this.BaseDef * this.Factor;
        if (this.IsDefStatus) def += this.BaseDef * this.DefStatusPlus;
        return def;
    }

    Description: string; //简介
    Soul: string;       //武魂
    TeamPosition: string;//团队角色
    Skill: string[];        //魂技
    Skill_A: SkillInfo[];    //魂技
    get Grade(): string {
        if (this.LV <= 9) return "魂士";
        if (this.LV <= 19) return "魂师";
        if (this.LV <= 29) return "大魂师";
        if (this.LV <= 39) return "魂尊";
        if (this.LV <= 49) return "魂宗";
        if (this.LV <= 59) return "魂王";
        if (this.LV <= 69) return "魂帝";
        if (this.LV <= 79) return "魂圣";
        if (this.LV <= 89) return "魂斗罗";
        if (this.LV <= 94) return "封号斗罗";
        if (this.LV <= 98) return "超级斗罗";
        if (this.LV == 99) return "极限斗罗";
        if (this.LV == 100) return "成神";
    }
    constructor(theName: string) { this.Name = theName; }
}

export class doubleSoul extends character {
    SecondSoul: string; //第二武魂
    SecondSkill: string[]; //第二武魂魂技        
}

