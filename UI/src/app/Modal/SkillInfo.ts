import { Character, Buffer } from './Character';
import { FightStatus } from '../Core/FightStatus';

/** 技能 */
export abstract class SkillInfo {
    Name: string;
    SkillType: enmSkillType;
    Range: enmRange;
    Direct: enmDirect;
    Description: string;
    /**冷却回合数 */
    ColdDownTurn: number = 0;
    /**实时冷却剩余数 */
    CurrentColdDown = 0;
    /**是否能使用 */
    IsAvalible(fs: FightStatus): string {
        let c = fs.currentActionCharater;
        if (c.MP < this.MpUsage) return "MP不足";
        if (this.CurrentColdDown !== 0) return "冷却中:" + this.CurrentColdDown;
        if (this.Combine !== undefined) {
            //武魂融合技
            let EveryOneCanAction = true;
            this.Combine.forEach(
                name => {
                    if (name !== c.Name) {
                        if (fs.TurnList.find(x => x.Name === name) === undefined) EveryOneCanAction = false;
                    }
                }
            );
            if (!EveryOneCanAction) return "融合者已行动";
        }
        return "";
    };
    /**效果随着等级变化 */
    EffectWithLevel = false;
    MpUsage: number = 5;
    /**武魂融合技的融合者列表 */
    Combine: string[] = [];
    abstract Excute(c: Character, fs: FightStatus): void;
    /**自定义执行方法 */
    CustomeExcute(c: Character, fs: FightStatus): boolean {
        return false;
    }
    //攻击并中毒这样的两个效果叠加的技能
    AddtionSkill: SkillInfo = undefined;
}

export class AttactSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Attact;
    Harm: number;
    IgnoreceDefence: boolean;
    Excute(c: Character, fs: FightStatus) {
        //如果自定义方法被执行，则跳过后续代码
        if (this.CustomeExcute(c, fs)) return;
        let factor = 1 + fs.currentActionCharater.LV / 100;
        c.HP -= Math.round(this.Harm * factor);
        if (c.HP <= 0) c.HP = 0;
        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}

export class HealSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Heal;
    RecoverHP: number = 0;
    RecoverMP: number = 0;
    RecoverHPPercent: number = 0;
    RecoverMPPercent: number = 0;
    Excute(c: Character, fs: FightStatus) {
        if (this.CustomeExcute(c, fs)) return;
        if (fs.IsDebugMode) console.log("Before HP:" + c.HP + " MP:" + c.MP);

        var factor = 1;
        /**Buffer强度是否和施法者等级挂钩？ */
        if (this.EffectWithLevel) {
            factor = 1 + fs.currentActionCharater.LV / 100;
        }

        if (this.RecoverHP !== 0) c.HP += Math.round(this.RecoverHP * factor);
        if (this.RecoverHPPercent !== 0) c.HP += Math.round(c.RealMaxHP * (this.RecoverHPPercent + factor));
        if (c.HP > c.RealMaxHP) c.HP = c.RealMaxHP;

        if (this.RecoverMP !== 0) c.MP += Math.round(this.RecoverMP * factor);
        if (this.RecoverMPPercent !== 0) c.MP += Math.round(c.RealMaxMP * (this.RecoverMPPercent + factor));
        if (c.MP > c.RealMaxMP) c.MP = c.RealMaxMP;

        if (fs.IsDebugMode) console.log("After HP:" + c.HP + " MP:" + c.MP);

        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}

/**增益和减弱 */
export class BufferStatusSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Buffer;
    Buffer: Buffer = new Buffer();
    /**Buffer强度是否和施法者等级挂钩？ */

    Excute(c: Character, fs: FightStatus) {
        if (this.CustomeExcute(c, fs)) return;
        //增加Buffer来源信息，相同的不叠加
        if (c.BufferList.find(x => x.Source === this.Name) !== undefined) return;
        //增幅强度和等级关联:如果是和施法者相关，必须使用currentActionCharater的信息
        if (this.EffectWithLevel) {
            let factor = fs.currentActionCharater.LV / 100;
            //以下不使用 1 + factor 是因为RealTimeAct()计算使用了 R += R * element.AttactFactor; 
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
        //这里必须使用副本
        c.BufferList.push(JSON.parse(JSON.stringify(this.Buffer)));
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