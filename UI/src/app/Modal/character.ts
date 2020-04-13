import { SkillInfo } from './SkillInfo';
import { Bone } from './Bone';
import { Field } from './Field';
import { Circle } from './Circle';

export class Character {
    /**姓名 */
    Name: string;
    /**等级 */
    LV: number;
    /**称号 */
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
    /**当前经验值 */
    Exp: number = 0;
    /**等级 */
    get NextNeedExp(): number {
        return Math.round(50 * Math.pow(1.1, this.LV - 1));
    }
    /**作为敌人的时候，击败的时候能够获得的经验值 */
    get GetExpWhenDefeat(): number {
        return Math.round(20 * Math.pow(1.1, this.LV - 1) * this.Factor);
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
    /**因子：3成功力的某个角色 */
    Factor: number = 1;
    /**成长速度因子 */
    GrowthFactor: number = 1;

    /**团队角色 */
    TeamPosition: enmTeamPosition = enmTeamPosition.辅助系;

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
            if (element.MaxHPFactor !== undefined) {
                R += R * element.MaxHPFactor;
            }
            if (element.MaxHPValue !== undefined) {
                R += element.MaxHPValue;
            }
        });
        return Math.round(R);
    }
    /**经过增益之后的魂力最大值 */
    get RealMaxMP(): number {
        var R = this.BaseMaxMP + (this.LV - 1) * this.MaxMPUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        this.BufferList.forEach(element => {
            if (element.MaxMPFactor !== undefined) {
                R += R * element.MaxMPFactor;
            }
            if (element.MaxMPValue !== undefined) {
                R += element.MaxMPValue;
            }
        });
        return Math.round(R);
    }

    get HPPercent(): number {
        return this.HP * 100 / this.RealMaxHP
    }

    get MPPercent(): number {
        return this.MP * 100 / this.RealMaxMP
    }

    /**实时攻击力 */
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
    /**实时防御力 */
    get RealTimeDef(): number {
        var R = this.BaseDef + (this.LV - 1) * this.DefUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
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

    /**实时速度 */
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

    /**简介 */
    Description: string;
    /**武魂 */
    Soul: string;
    /**魂环 */
    Circles: Circle[];
    //第二武魂
    SecondSoul: string;
    //第二魂环
    SecondCircles: Circle[];

    /**魂骨 */
    Bones: Bone[] = [];
    /**领域技能 */
    Fields: Field[] = [];

    get CircleSkill(): SkillInfo[] {
        let sl: SkillInfo[] = [];
        if (this.Circles === undefined) return sl;
        this.Circles.forEach(
            b => {
                if (b.FirstSkill !== undefined) sl.push(b.FirstSkill);
                if (b.SecondSkill !== undefined) sl.push(b.SecondSkill);
            }
        );
        return sl;
    }

    get SecondCircleSkill(): SkillInfo[] {
        let sl: SkillInfo[] = [];
        if (this.SecondCircles === undefined) return sl;
        this.SecondCircles.forEach(
            b => {
                if (b.FirstSkill !== undefined) sl.push(b.FirstSkill);
                if (b.SecondSkill !== undefined) sl.push(b.SecondSkill);
            }
        );
        return sl;
    }

    /**魂骨魂技列表 */
    get BoneSkill(): SkillInfo[] {
        let sl: SkillInfo[] = [];
        this.Bones.forEach(
            b => {
                if (b.FirstSkill !== undefined) sl.push(b.FirstSkill);
                if (b.SecondSkill !== undefined) sl.push(b.SecondSkill);
            }
        );
        return sl;
    }

    /**武魂融合技 */
    CombineSkill: SkillInfo[] = [];

    get Skill(): SkillInfo[] {
        return this.CircleSkill.concat(this.SecondCircleSkill).concat(this.BoneSkill).concat(this.CombineSkill);
    }

    /**增益 */
    BufferList: Array<Buffer>;

    get StatusList(): Array<characterStatus> {
        var m = new Array<characterStatus>();
        this.BufferList.forEach(buffer => {
            buffer.Status.forEach(
                status => {
                    if (m.find(x => x === status) === undefined) m.push(status);
                }
            )
        });
        return m;
    };
    BufferTurnDown() {
        this.BufferList.forEach(element => {
            if (element.Status.find(x => x === characterStatus.中毒) !== undefined) {
                //中毒状态，如果存在HP伤害部分，则这里处理，由于使用了get自动属性功能，Real系的都会自动计算
                if (element.HPFactor !== undefined) this.HP += this.HP * element.HPFactor;
                if (element.HPValue !== undefined) this.HP += element.HPValue;
            }
            element.Turns -= 1;
        });
        this.Skill.forEach(
            skill => {
                //技能ColdDown
                if (skill.CurrentColdDown > 0) skill.CurrentColdDown -= 1;
            }
        )
        this.BufferList = this.BufferList.filter(x => x.Turns > 0);
    }
    constructor(theName: string) {
        this.Name = theName;
        this.BufferList = new Array<Buffer>();
    }
}

/**Buffer */
export class Buffer {
    //Value表示绝对值，Percent表示百分比

    MaxHPValue: number = undefined;
    MaxHPFactor: number = undefined;

    HPValue: number = undefined;
    HPFactor: number = undefined;

    MaxMPValue: number = undefined;
    MaxMPFactor: number = undefined;

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
    /**持续回合数 */
    Turns: number = 999;    //默认999回合
    /**状态 */
    Status: characterStatus[] = [characterStatus.魂技];
}

export enum enmTeamPosition {
    强攻系,
    敏攻系,
    控制系,
    辅助系
}

/**状态 */
export enum characterStatus {
    /**通用 */
    魂技,
    /**增益 */
    攻击增益,
    防御增益,
    速度增益,
    生命增益,
    魂力增益,
    /**衰减 */
    攻击衰减,
    防御衰减,
    速度衰减,
    生命衰减,
    魂力衰减,
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



