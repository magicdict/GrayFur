import { SkillInfo } from './SkillInfo';
import { FightStatus } from '../module/FightStatus';
import { Equipment } from './Equipment';

export class character {
    Name: string;   //姓名
    LV: number;      //等级

    BaseMaxHP: number;  //最大生命值
    HP: number;     //生命值
    BaseMaxMP: number;  //最大魔法值（魂力）
    MP: number;         //魔法值（魂力）

    BaseAct: number;     //基础攻击力
    BaseDef: number;     //基础防御力

    //战斗状态下使用属性
    /**速度：出手顺序 */
    BaseSpeed: number;
    get RealSpeed(): number {
        var R = this.BaseSpeed * this.Factor;
        if (this.Buffer.SpeedFactor !== undefined) {
            R += R * this.Buffer.SpeedFactor;
        }
        if (this.Buffer.SpeedValue !== undefined) {
            R += this.Buffer.SpeedValue;
        }
        return R;
    }


    /**角色在战场上是否为我方角色 */
    IsMyTeam: boolean;
    /**是否为防御状态 */
    IsDefStatus: boolean;
    /**因子：3成功力的某个角色 */
    Factor: number = 1;
    /**增益 */
    Buffer: BufferList;
    /**状态 */
    Status: Array<[characterStatus, number]>;

    /**经过增益之后的生命最大值 */
    get RealMaxHP(): number {
        var R = this.BaseMaxHP * this.Factor;
        if (this.Buffer.HPFactor !== undefined) {
            R += R * this.Buffer.HPFactor;
        }
        if (this.Buffer.HPValue !== undefined) {
            R += this.Buffer.HPValue;
        }
        return R;
    }
    /**经过增益之后的魂力最大值 */
    get RealMaxMP(): number {
        var R = this.BaseMaxMP * this.Factor;
        if (this.Buffer.MPFactor !== undefined) {
            R += R * this.Buffer.MPFactor;
        }
        if (this.Buffer.MPValue !== undefined) {
            R += this.Buffer.MPValue;
        }
        return R;
    }

    //实时攻击力
    get RealTimeAct(): number {
        var act = this.BaseAct * this.Factor;
        if (this.Buffer.AttactFactor !== undefined) {
            act += act * this.Buffer.AttactFactor;
        }
        if (this.Buffer.AttactValue !== undefined) {
            act += this.Buffer.AttactValue;
        }
        return act;
    };

    /**防御状态下防御力加成 */
    DefStatusPlus: number = 0.5;
    //实时防御力
    get RealTimeDef(): number {
        var def = this.BaseDef * this.Factor;
        if (this.IsDefStatus) {
            def += def * this.DefStatusPlus
        }
        if (this.Buffer.DefenceFactor !== undefined) {
            def += def * this.Buffer.DefenceFactor;
        }
        if (this.Buffer.DefenceValue !== undefined) {
            def += this.Buffer.DefenceValue;
        }
        return def;
    }
    //AI能力
    AI: (role: character, fightstatus: FightStatus) => void = undefined;
    /**简介 */
    Description: string;
    /**武魂 */
    Soul: string;
    /**魂骨 */
    Bones: Equipment[];

    TeamPosition: string;//团队角色
    /**魂技名称 */
    SkillName: string[];
    Skill: SkillInfo[];    //魂技
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
    appendStatus(StatusWithTurn: [characterStatus, number]) {
        let t = this.Status.find(x => x[0] === StatusWithTurn[0])
        if (t === undefined) {
            //不存在的情况
            this.Status.push(StatusWithTurn);
        } else {
            StatusWithTurn[1] += t[1];
            this.Status = this.Status.filter(x => x[0] !== StatusWithTurn[0]);
            this.Status.push(StatusWithTurn);
        }
    }

    removeStatus(status: characterStatus) {
        this.Status = this.Status.filter(x => x[0] !== status);
    }
    constructor(theName: string) {
        this.Name = theName;
        this.Buffer = new BufferList();
    }
}

/**Buffer */
export class BufferList {
    //Value表示绝对值，Percent表示百分比

    HPValue: number = undefined;
    HPFactor: number = undefined;

    MPValue: number = undefined;
    MPFactor: number = undefined;

    SpeedValue: number = undefined;
    SpeedFactor: number = undefined;

    AttactValue: number = undefined;
    AttactFactor: number = undefined;

    DefenceValue: number = undefined;
    DefenceFactor: number = undefined;

}

/**状态 */
export enum characterStatus {
    /**每回合失去生命值 */
    中毒,
    /**无法使用技能 */
    禁言,
    /**无法物理和技能攻击 */
    晕眩,
    /**无法普通攻击，可以使用技能 */    
    束缚,
    /**物理攻击免疫 */
    物免,
    /**技能攻击免疫 */
    魔免,
    /**全部免疫 */
    无敌,
    //特色特殊状态:战斗开始的时候将被清除掉
    /**马红俊 */
    浴火凤凰,
    /**朱竹清 */
    幽冥影分身
}

export class doubleSoul extends character {
    SecondSoul: string; //第二武魂
    SecondSkillName: string[]; //第二武魂魂技        
}

