import { character, enmTeamPosition } from '../Modal/character';
import { FightStatus } from './FightStatus';
import { AttactSkillInfo, SkillInfo, enmDirect, enmRange } from '../Modal/SkillInfo';



export class RPGCore {
    //以下是伤害计算的核心公式
    public static NornamAct(Act: character, BeAct: character): number {
        var HarmPoint = Act.RealTimeAct - BeAct.RealTimeDef;
        if (HarmPoint < 0) HarmPoint = 5;   //命中时候的最低消费
        return HarmPoint;
    }

    //敌方人工智能
    public static EnemyAI(c: character, status: FightStatus) {
        console.log("敌方人工智能:" + c.Name);
        //自己的状态的评估
        let IsLowHP = c.HP < 50;
        //可以使用技能的总结
        let EnableSkill = c.Skill.filter(x => x.MpUsage <= c.MP);
        //如果攻击系的或者毒的技能，则先使用
        let EnableAttactSkill = EnableSkill.filter(x => x instanceof AttactSkillInfo);
        switch (c.TeamPosition) {
            case enmTeamPosition.强攻系:
                break;
            case enmTeamPosition.敏攻系:
                break;
            case enmTeamPosition.控制系:
                break;
            case enmTeamPosition.辅助系:
                break;
        }

        if (EnableSkill.length >= status.TurnCnt) {
            this.ExcuteSkill(EnableSkill[status.TurnCnt - 1], status);
            return;
        }

        //血量最少的人作为目标
        let attactC = status.MyTeam.sort((x, y) => { return x.HP - y.HP; })[0];
        attactC.HP -= RPGCore.NornamAct(c, attactC);
        if (status.IsDebugMode) console.log(c.Name + "普通攻击=>" + attactC.Name)
        if (attactC.HP <= 0) attactC.HP = 0;
    }

    /**使用技能 */
    static ExcuteSkill(skill: SkillInfo, status: FightStatus) {
        status.currentActionCharater.MP -= skill.MpUsage;
        var c: character;
        switch (skill.Range) {
            case enmRange.Self:
                skill.Excute(status.currentActionCharater, status);
                break;
            case enmRange.PickOne:
                switch (skill.Direct) {
                    case enmDirect.All:
                        break;
                    case enmDirect.MyTeam:
                        //这里应该使用status.Enemy
                        //一般选择队伍里面HP最少的人比较合适
                        c = status.Enemy.sort((x, y) => { return x.HP - y.HP; })[0];
                        console.log(status.currentActionCharater.Name + "对[" + c.Name + "]使用了技能：" + skill.Name);
                        skill.Excute(c, status);
                        break;
                    case enmDirect.Enemy:
                        //这里应该使用status.MyTeam
                        //一般选择队伍里面HP最少的人比较合适
                        c = status.MyTeam.sort((x, y) => { return x.HP - y.HP; })[0];
                        console.log(status.currentActionCharater.Name + "对[" + c.Name + "]使用了技能：" + skill.Name);
                        skill.Excute(c, status);
                        break;
                }
                break;
        }
    }
}