import { character } from './character';

/** 技能 */
export abstract class SkillInfo {
    Name: string;
    Order: number;   //第N魂技
    SkillType: enmSkillType;
    Range: enmRange;
    Direct: enmDirect;
    Description: string;
    Source: string;
    MpUsage(): number {
        return Math.pow(2, this.Order);
    }
    abstract Excute(c: character);
}

export class BlockSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Block;
    Turns: number;
    BlockAttact: boolean;   //束缚
    BlockSkill: boolean;    //晕眩
    Excute(c: character) {
        if (this.BlockAttact) { }
        if (this.BlockSkill) { }
    }
}

export class AttactSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Attact;
    Harm: number;
    Excute(c: character) {
        c.HP -= this.Harm;
        if (c.HP <= 0) c.HP = 0;
    }
}

export class DefenceSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Defence;
    Turns: number;
    Excute(c: character) {

    }
}

export class HealSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Heal;
    RecoverHP:number = 0;
    RecoverMP:number = 0;
    Excute(c: character) {
        c.HP += this.RecoverHP;
        if (c.HP > c.MaxHP) c.HP = c.MaxHP;
        c.MP += this.RecoverMP;
        if (c.MP > c.MaxMP) c.MP = c.MaxMP;
    }
}

//技能类型
export enum enmSkillType {
    Attact,     //攻击 
    Defence,    //防御 
    Heal,       //治疗 
    Buffer,     //光环 
    Block       //限制
}

export enum enmRange {
    Self,       //自己
    PickOne,    //选择一个人
    RandomOne,  //随机选择一个人
    FrontAll,   //前排所有人
    BackAll,    //后排所有人
    EveryOne,   //战场所有人
}

export enum enmDirect {
    MyTeam,     //本方
    Enemy,      //敌方
    All,        //全体
}


