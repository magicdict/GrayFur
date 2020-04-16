import { Character, Buffer, characterStatus } from './Character';
import { FightStatus } from '../Core/FightStatus';
import { enmSkillType, enmRange, enmDirect } from './EnumAndConst';



/** 技能 */
export abstract class SkillInfo {
    /**技能名称 */
    Name: string;
    /**技能类型 */
    SkillType: enmSkillType;
    /**技能范围 */
    Range: enmRange;
    /**技能方向 */
    Direct: enmDirect;
    /**说明 */
    abstract Instruction(): string;
    /**描述 */
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
            if (!EveryOneCanAction) return "融合者错误";
        }
        return "";
    };
    /**效果随着等级变化 */
    EffectWithLevel = false;
    /**魔法消耗 */
    MpUsage: number = 5;
    /**武魂融合技的融合者列表 */
    Combine: string[] = [];
    /**执行 */
    abstract Excute(c: Character, fs: FightStatus): void;
    /**自定义执行方法 */
    CustomeExcute(c: Character, fs: FightStatus): boolean {
        return false;
    }
    //攻击并中毒这样的两个效果叠加的技能
    AddtionSkill: SkillInfo = undefined;
}

export class AttactSkillInfo extends SkillInfo {
    Instruction(): string {
        switch (this.Range) {
            case enmRange.PickOne:
                return "单体攻击 伤害：" + this.Harm + (this.IgnoreDefence ? " （无视防御力）" : "");
            case enmRange.EveryOne:
                return "群体攻击 伤害：" + this.Harm + (this.IgnoreDefence ? " （无视防御力）" : "");
        }
    }
    SkillType = enmSkillType.Attact;
    /**伤害值 */
    Harm: number;
    /**无视防御 */
    IgnoreDefence: boolean = false;
    /**执行 */
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
    Instruction(): string {
        var recover = "";
        if (this.RecoverHP !== 0) recover += "生命值：" + this.RecoverHP
        if (this.RecoverMP !== 0) recover += "魂力：" + this.RecoverMP
        if (this.RecoverHPPercent !== 0) recover += "生命值比例：" + this.RecoverHPPercent + "%";
        if (this.RecoverMPPercent !== 0) recover += "魂力比例：" + this.RecoverMPPercent + "%";
        switch (this.Range) {
            case enmRange.PickOne:
                return "单体回复：" + recover;
            case enmRange.EveryOne:
                return "群体回复：" + recover;
        }
    }
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
    Instruction(): string {
        var status = "";
        this.Buffer.Status.forEach(element => {
            status += characterStatus[element] + "/";
        });
        status = status.substr(0, status.length - 1);
        switch (this.Range) {
            case enmRange.PickOne:
                return "单体状态：" + status + " 回合数：" + this.Buffer.Turns;
            case enmRange.EveryOne:
                return "群体状态：" + status + " 回合数：" + this.Buffer.Turns;
            case enmRange.Self:
                return "自身状态：" + status + " 回合数：" + this.Buffer.Turns;
        }
    }
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
                var status = "";
                element.Status.forEach(st => {
                    status += characterStatus[st] + "/";
                });
                status = status.substr(0, status.length - 1);
                console.log("回合数：" + element.Turns + "\t状态：" + status + "\t来源：" + element.Source);
            });
        }
        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}

/**召唤系技能 */
export class SummonSkillInfo extends SkillInfo {
    ServantName: string;
    Factor: number;
    SkillType = enmSkillType.Summon;
    Instruction(): string {
        return "召唤" + this.ServantName + "进入战场";
    }
    Excute(c: Character, fs: FightStatus): void {
        let x = fs.GetRoleByName(this.ServantName);
        fs.MyTeam.every(
            c => {
                if (c === undefined) {
                    c = x;
                    return true;
                }
            }
        )
    }
}

export class NotImplementedSkillInfo extends SkillInfo {
    SkillType = enmSkillType.NotImplemented;
    MpUsage = 0;
    Instruction(): string {
        return "Method not implemented.";
    }
    Excute(c: Character, fs: FightStatus): void {
        return;
    }
}