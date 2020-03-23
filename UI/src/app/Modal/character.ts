import { SkillInfo } from './SkillInfo';
import { FightStatus } from '../module/FightStatus';
import { Equipment } from './Equipment';
import { RPGCore } from './RPGCore';

export class character {
    /**姓名 */
    Name: string;
    /**等级 */
    LV: number;
    /**当前经验值 */
    Exp: number = 0;

    get NextNeedExp(): number {
        return RPGCore.NeedExpForNextLv(this.LV);
    }

    /**最大生命值 */
    BaseMaxHP: number = 100;
    HP: number;     //生命值

    BaseMaxMP: number = 20;  //最大魔法值（魂力）
    MP: number;         //魔法值（魂力）

    BaseAct: number = 10;     //基础攻击力
    BaseDef: number = 10;     //基础防御力

    //战斗状态下使用属性
    /**速度：出手顺序 */
    BaseSpeed: number = 10;

    /**角色在战场上是否为我方角色 */
    IsMyTeam: boolean;
    /**是否为防御状态 */
    IsDefStatus: boolean;
    /**因子：3成功力的某个角色 */
    Factor: number = 1;
    /**成长速度因子 */
    GrowthFactor: number = 1;
    /**速度成长值 */
    get SpeedUpPerLv(): number {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return 5;
            case enmTeamPosition.敏攻系:
                return 15;
            case enmTeamPosition.控制系:
                return 10;
            case enmTeamPosition.辅助系:
                return 10;
        }
    }
    get MaxHPUpPerLv(): number {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return 100;
            case enmTeamPosition.敏攻系:
                return 25;
            case enmTeamPosition.控制系:
                return 40;
            case enmTeamPosition.辅助系:
                return 40;
        }
    }
    get MaxMPUpPerLv(): number {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return 5;
            case enmTeamPosition.敏攻系:
                return 10;
            case enmTeamPosition.控制系:
                return 15;
            case enmTeamPosition.辅助系:
                return 10;
        }
    }
    get ActUpPerLv(): number {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return 15;
            case enmTeamPosition.敏攻系:
                return 15;
            case enmTeamPosition.控制系:
                return 5;
            case enmTeamPosition.辅助系:
                return 5;
        }
    }
    get DefUpPerLv(): number {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return 15;
            case enmTeamPosition.敏攻系:
                return 5;
            case enmTeamPosition.控制系:
                return 5;
            case enmTeamPosition.辅助系:
                return 5;
        }
    }

    /**经过增益之后的生命最大值 */
    get RealMaxHP(): number {
        var R = this.BaseMaxHP + (this.LV - 1) * this.MaxHPUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        this.BufferList.forEach(element => {
            if (element.HPFactor !== undefined) {
                R += R * element.HPFactor;
            }
            if (element.HPValue !== undefined) {
                R += element.HPValue;
            }
        });
        return Math.round(R);
    }
    /**经过增益之后的魂力最大值 */
    get RealMaxMP(): number {
        var R = this.BaseMaxMP + (this.LV - 1) * this.MaxMPUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        this.BufferList.forEach(element => {
            if (element.MPFactor !== undefined) {
                R += R * element.MPFactor;
            }
            if (element.MPValue !== undefined) {
                R += element.MPValue;
            }
        });
        return Math.round(R);
    }

    //实时攻击力
    get RealTimeAct(): number {
        var R = this.BaseAct + (this.LV - 1) * this.ActUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        this.BufferList.forEach(element => {
            if (element.AttactFactor !== undefined) {
                R += R * element.AttactFactor;
            }
            if (element.AttactValue !== undefined) {
                R += element.AttactValue;
            }
        });
        return Math.round(R);
    };

    /**防御状态下防御力加成 */
    DefStatusPlus: number = 0.5;
    //实时防御力
    get RealTimeDef(): number {
        var R = this.BaseDef + (this.LV - 1) * this.DefUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        if (this.IsDefStatus) {
            R += R * this.DefStatusPlus
        }
        this.BufferList.forEach(element => {
            if (element.DefenceFactor !== undefined) {
                R += R * element.DefenceFactor;
            }
            if (element.DefenceValue !== undefined) {
                R += element.DefenceValue;
            }
        });
        return Math.round(R);
    }

    get RealSpeed(): number {
        var R = this.BaseSpeed + (this.LV - 1) * this.SpeedUpPerLv * this.GrowthFactor;
        this.BufferList.forEach(element => {
            if (element.SpeedFactor !== undefined) {
                R += R * element.SpeedFactor;
            }
            if (element.SpeedValue !== undefined) {
                R += element.SpeedValue;
            }
        });
        return Math.round(R);
    }

    //AI能力
    AI: (role: character, fightstatus: FightStatus) => void = undefined;
    /**简介 */
    Description: string;
    /**武魂 */
    Soul: string;
    /**魂骨 */
    Bones: Equipment[];

    TeamPosition: enmTeamPosition;//团队角色

    get strTeamPosition(): string {
        switch (this.TeamPosition) {
            case enmTeamPosition.强攻系:
                return "强攻系"
            case enmTeamPosition.控制系:
                return "控制系"
            case enmTeamPosition.敏攻系:
                return "敏攻系"
            case enmTeamPosition.辅助系:
                return "辅助系"
        }
    }

    /**魂技名称 */
    SkillName: string[];
    /**魂技 */
    Skill: SkillInfo[];

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

    /**增益 */
    BufferList: Array<Buffer>;
    /**状态 */
    Status: Array<[characterStatus, number]>;

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
        this.BufferList = new Array<Buffer>();
    }
}

/**Buffer */
export class Buffer {
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
    /**来源 */
    Source: string;
}

export enum enmTeamPosition {
    强攻系,
    敏攻系,
    控制系,
    辅助系
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
    幽冥影分身,
    /**香肠效果 */
    飞行
}

export class doubleSoul extends character {
    SecondSoul: string; //第二武魂
    SecondSkillName: string[]; //第二武魂魂技        
}

