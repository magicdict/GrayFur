import { Character, enmTeamPosition } from '../Modal/Character';
import { FightStatus } from './FightStatus';
import { SkillInfo, enmDirect, enmRange } from '../Modal/SkillInfo';

export class RPGCore {
    //以下是伤害计算的核心公式
    public static NornamAct(Act: Character, BeAct: Character): number {
        var HarmPoint = Math.round(Act.RealTimeAct - BeAct.RealTimeDef);
        if (HarmPoint < 0) HarmPoint = 5;   //命中时候的最低消费
        return HarmPoint;
    }

    //敌方人工智能
    public static EnemyAI(c: Character, status: FightStatus): string {
        console.log("敌方人工智能:" + c.Name);
        //可以使用技能列表
        let EnableSkill = c.Skill.filter(x => x.MpUsage <= c.MP && x.CurrentColdDown === 0);
        if (EnableSkill.length === 0) {
            //血量最少的人作为目标
            let BeAttactCharactor = status.MyTeam.sort((x, y) => { return x.HP - y.HP; })[0];
            BeAttactCharactor.HP -= RPGCore.NornamAct(c, BeAttactCharactor);
            if (status.IsDebugMode) console.log(c.Name + "普通攻击=>" + BeAttactCharactor.Name)
            if (BeAttactCharactor.HP <= 0) BeAttactCharactor.HP = 0;
            return c.Name + "普通攻击=>" + BeAttactCharactor.Name;
        }

        switch (c.TeamPosition) {
            case enmTeamPosition.强攻系:
                if (this.EnemyAI_强攻系(c)) return "";
                break;
            case enmTeamPosition.敏攻系:
                if (this.EnemyAI_敏攻系()) return "";
                break;
            case enmTeamPosition.控制系:
                if (this.EnemyAI_控制系()) return "";
                break;
            case enmTeamPosition.辅助系:
                if (this.EnemyAI_辅助系()) return "";
                break;
        }

        if (EnableSkill.length >= status.TurnCnt) {
            return this.ExcuteSkill(EnableSkill[status.TurnCnt - 1], status);
        } else {
            return this.ExcuteSkill(EnableSkill[EnableSkill.length - 1], status);
        }
    }

    public static EnemyAI_强攻系(c: Character): boolean {
        return false;
    }
    public static EnemyAI_敏攻系(): boolean {
        return false;
    }
    public static EnemyAI_控制系(): boolean {
        return false;
    }
    public static EnemyAI_辅助系(): boolean {
        return false;
    }


    /**使用技能 */
    static ExcuteSkill(skill: SkillInfo, status: FightStatus): string {
        status.currentActionCharater.MP -= skill.MpUsage;
        skill.CurrentColdDown = skill.ColdDownTurn + 1; //本轮结束会自动减1，所以这里额外加1
        switch (skill.Range) {
            case enmRange.Self:
                skill.Excute(status.currentActionCharater, status);
                return status.currentActionCharater.Name + "对自己使用了技能：" + skill.Name;;
            case enmRange.EveryOne:
                switch (skill.Direct) {
                    case enmDirect.All:
                        status.Enemy.forEach(
                            element => {
                                if (element !== undefined && element.HP > 0) {
                                    console.log(status.currentActionCharater.Name + "对[" + element.Name + "]使用了技能：" + skill.Name);
                                    skill.Excute(element, status);
                                }
                            }
                        )
                        status.MyTeam.forEach(
                            element => {
                                if (element !== undefined && element.HP > 0) {
                                    console.log(status.currentActionCharater.Name + "对[" + element.Name + "]使用了技能：" + skill.Name);
                                    skill.Excute(element, status);
                                }
                            }
                        )
                        return status.currentActionCharater.Name + "对敌我双方使用了技能：" + skill.Name;;
                    case enmDirect.MyTeam:
                        status.Enemy.forEach(
                            element => {
                                if (element !== undefined && element.HP > 0) {
                                    console.log(status.currentActionCharater.Name + "对[" + element.Name + "]使用了技能：" + skill.Name);
                                    skill.Excute(element, status);
                                }
                            }
                        )
                        return status.currentActionCharater.Name + "对敌双方使用了技能：" + skill.Name;;
                    case enmDirect.Enemy:
                        status.MyTeam.forEach(
                            element => {
                                if (element !== undefined && element.HP > 0) {
                                    console.log(status.currentActionCharater.Name + "对[" + element.Name + "]使用了技能：" + skill.Name);
                                    skill.Excute(element, status);
                                }
                            }
                        )
                        return status.currentActionCharater.Name + "对我双方使用了技能：" + skill.Name;;
                }
            case enmRange.PickOne:
                var c: Character;
                switch (skill.Direct) {
                    case enmDirect.All:
                        break;
                    case enmDirect.MyTeam:
                        //这里应该使用status.Enemy
                        //一般选择队伍里面HP最少的人比较合适
                        c = status.Enemy.sort((x, y) => { return x.HP - y.HP; })[0];
                        skill.Excute(c, status);
                        return status.currentActionCharater.Name + "对[" + c.Name + "]使用了技能：" + skill.Name;
                    case enmDirect.Enemy:
                        //这里应该使用status.MyTeam
                        //一般选择队伍里面HP最少的人比较合适
                        c = status.MyTeam.sort((x, y) => { return x.HP - y.HP; })[0];
                        skill.Excute(c, status);
                        return status.currentActionCharater.Name + "对[" + c.Name + "]使用了技能：" + skill.Name;
                }
                break;
        }
        return skill.Name;
    }
}