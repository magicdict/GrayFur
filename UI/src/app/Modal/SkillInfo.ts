import { character, Buffer, characterStatus } from './character';
import { FightStatus } from '../Core/FightStatus';

/** 技能 */
export abstract class SkillInfo {
    Name: string;
    Order: number;   //第N魂技
    SkillType: enmSkillType;
    Range: enmRange;
    Direct: enmDirect;
    Description: string;
    Source: string;
    get MpUsage(): number {
        if (this.Order === undefined) return 0; //道具是不消耗魂力的
        return Math.pow(2, this.Order);
    }
    /**武魂融合技的融合者列表 */
    Combine: string[];
    abstract Excute(c: character, fs: FightStatus): void;
    /**自定义执行方法 */
    CustomeExcute(c: character, fs: FightStatus): boolean {
        return false;
    }
    //攻击并中毒这样的两个效果叠加的技能
    AddtionSkill: SkillInfo = undefined;
}

export class AttactSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Attact;
    Harm: number;
    Excute(c: character, fs: FightStatus) {
        //如果自定义方法被执行，则跳过后续代码
        if (this.CustomeExcute(c, fs)) return;
        let factor = fs.currentActionCharater.LV / 100;
        c.HP -= Math.round(this.Harm * factor);
        if (c.HP <= 0) c.HP = 0;

        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}

export class HealSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Heal;
    RecoverHP: number = 0;
    RecoverMP: number = 0;
    Excute(c: character, fs: FightStatus) {
        if (this.CustomeExcute(c, fs)) return;
        let factor = fs.currentActionCharater.LV / 100;
        c.HP += Math.round(this.RecoverHP * factor);
        if (c.HP > c.RealMaxHP) c.HP = c.RealMaxHP;
        c.MP += Math.round(this.RecoverMP * factor);
        if (c.MP > c.RealMaxMP) c.MP = c.RealMaxMP;
        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}

/**增益和减弱 */
export class BufferStatusSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Buffer;
    Buffer: Buffer = new Buffer();
    /**Buffer强度是否和施法者等级挂钩？ */
    BufferFactorByLV = false;
    Excute(c: character, fs: FightStatus) {
        if (this.CustomeExcute(c, fs)) return;
        //增加Buffer来源信息，相同的不叠加
        if (c.BufferList.find(x => x.Source === this.Name) !== undefined) return;
        //增幅强度和等级关联:如果是和施法者相关，必须使用currentActionCharater的信息
        if (this.BufferFactorByLV) {
            let factor = fs.currentActionCharater.LV / 100;
            if (this.Buffer.AttactFactor !== undefined) this.Buffer.AttactFactor = factor;
            if (this.Buffer.DefenceFactor !== undefined) this.Buffer.DefenceFactor = factor;
            if (this.Buffer.MaxHPFactor !== undefined) this.Buffer.MaxHPFactor = factor;
            if (this.Buffer.MaxMPFactor !== undefined) this.Buffer.MaxMPFactor = factor;
            if (this.Buffer.SpeedFactor !== undefined) this.Buffer.SpeedFactor = factor;
        }
        //从技能使用点开始就起效的属性变化的调整:由于使用了get自动属性功能，Real系的都会自动计算
        let MaxHpBefore = c.RealMaxHP;
        let MaxMpBefore = c.RealMaxMP;
        this.Buffer.Source = this.Name;
        c.BufferList.push(this.Buffer);
        let MaxHpAfter = c.RealMaxHP;
        let MaxMpAfter = c.RealMaxMP;
        //魂力和生命的等比缩放
        if (MaxHpAfter !== MaxHpBefore) c.HP = Math.round(c.HP * (MaxHpAfter / MaxHpBefore))
        if (MaxMpAfter !== MaxMpBefore) c.MP = Math.round(c.MP * (MaxMpAfter / MaxMpBefore))
        //生命值和魂力的Buffer，还需要对于HP和MP进行修正
        if (c.HP > c.RealMaxHP) c.HP = c.RealMaxHP;
        if (c.MP > c.RealMaxMP) c.MP = c.RealMaxMP;
        if (fs.IsDebugMode) {
            console.log("技能对象：" + c.Name);
            c.BufferList.forEach(element => {
                console.log("回合数：" + element.Turns + "\t状态" + element.Status.toString() + "\t来源" + element.Source);
            });
        }
        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}



/**技能类型 */
export enum enmSkillType {
    /**攻击 */
    Attact,
    /**治疗 */
    Heal,
    /**光环和状态  */
    Buffer
}

/**技能范围 */
export enum enmRange {
    Self,       //自己
    PickOne,    //选择一个人
    RandomOne,  //随机选择一个人
    FrontAll,   //前排所有人
    BackAll,    //后排所有人
    EveryOne,   //战场所有人
}

/**技能方向 */
export enum enmDirect {
    MyTeam,     //本方
    Enemy,      //敌方
    All,        //全体
}



