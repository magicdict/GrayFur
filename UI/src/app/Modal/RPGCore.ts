import { character } from './character';
import { FightStatus } from '../module/FightStatus';

export class RPGCore {
    public static NeedExpForNextLv(CurrentLV: number): number {
        return Math.round(50 * Math.pow(1.1, CurrentLV - 1));
    }

    //以下是伤害计算的核心公式
    public static NornamAct(Act: character, BeAct: character): number {
        var HarmPoint = Act.RealTimeAct - BeAct.RealTimeDef;
        if (HarmPoint < 0) HarmPoint = 5;   //命中时候的最低消费
        return HarmPoint;
    }

    //敌方人工智能
    public static EnemyAI(c: character, status: FightStatus) {
        console.log("敌方人工智能:" + c.Name);
        //初级阶段,对前排的一个活人进行普通攻击
        status.MyTeam.some(element => {
            if (element !== undefined && element.HP > 0) {
                element.HP -= RPGCore.NornamAct(c, element);
                if(status.IsDebugMode) console.log(c.Name + "普通攻击=>" + element.Name)
                if (element.HP <= 0) element.HP = 0;
                return true;
            }
        });
    }
}