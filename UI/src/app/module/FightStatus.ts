import { character, characterStatus } from '../Modal/character';
import { BattleInfo } from '../Modal/BattleInfo';
import { GameEngine } from './GameEngine.service';
import { Output, EventEmitter } from '@angular/core';


export class FightStatus {
    Enemy: character[];
    MyTeam: character[];
    info: BattleInfo;
    currentActionCharater: character;
    @Output() ResultEvent: EventEmitter<number> = new EventEmitter<number>();
    //列出当前所有战场角色的速度列表，每一回合的出手顺序根据速度来实现
    TurnList: Array<character>;

    constructor(battleinfo: BattleInfo, ge: GameEngine) {
        this.info = battleinfo;

        this.Enemy = battleinfo.Enemy.map(x => ge.GetRoleByName(x));
        this.Enemy.forEach(element => {
            if (element !== undefined) {
                element.IsMyTeam = false;
                this.InitRole(element);
            }
        });

        this.MyTeam = battleinfo.MyTeam.map(x => ge.GetRoleByName(x));
        this.MyTeam.forEach(element => {
            if (element !== undefined) {
                element.IsMyTeam = true;
                this.InitRole(element);
            }
        });

    }

    InitRole(c:character){
        c.HP = c.BaseMaxHP;
        c.MP = c.BaseMaxMP;
        c.Status = new Array<[characterStatus, number]>();
    }

    NewTurn() {
        console.log("新的回合");
        this.TurnList = new Array<character>();
        //所有HP不为0的角色进入回合列表
        this.MyTeam.forEach(element => {
            if (element !== undefined && element.HP > 0)
                this.TurnList.push(element)
        });
        this.Enemy.forEach(element => {
            if (element !== undefined && element.HP > 0)
                this.TurnList.push(element)
        });
        //速度升序排序
        this.TurnList.sort((x, y) => { return x.Speed - y.Speed });
        let Role = this.TurnList.pop();
        console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
        if (Role.IsMyTeam) {
            this.currentActionCharater = Role;
        } else {
            //AI For Enemy
            this.EnemyAI(Role);
            this.ActionDone();
        }
    }

    //当前角色动作完成
    ActionDone() {
        //胜负统计
        let MyTeamLive = this.MyTeam.find(x => x !== undefined && x.HP > 0);
        if (MyTeamLive === undefined) {
            console.log("团灭");
            this.ResultEvent.emit(0);
            return;
        }

        let EnemyTeamLive = this.Enemy.find(x => x !== undefined && x.HP > 0);
        if (EnemyTeamLive === undefined) {
            console.log("胜利");
            this.ResultEvent.emit(1);
            return;
        }
        //气绝者去除
        this.MyTeam = this.MyTeam.map(x => x !== undefined && x.HP > 0 ? x : undefined);
        this.Enemy = this.Enemy.map(x => x !== undefined && x.HP > 0 ? x : undefined);

        if (this.TurnList.length == 0) {
            console.log("回合结束");
            this.NewTurn();
        } else {
            let Role = this.TurnList.pop();
            if (Role === undefined) {
                //角色已经气绝
                this.ActionDone();
            } else {
                console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
                if (Role.IsMyTeam) {
                    this.currentActionCharater = Role;
                } else {
                    //AI For Enemy
                    if (Role.AI === undefined) {
                        this.EnemyAI(Role);
                    } else {
                        Role.AI(Role, this);
                    }
                    this.ActionDone();
                }
            }
        }
    }
    //敌方人工智能
    EnemyAI(c: character) {
        console.log("敌方人工智能:" + c.Name);
        //初级阶段,对前排的一个活人进行普通攻击
        this.MyTeam.some(element => {
            if (element !== undefined && element.HP > 0) {
                element.HP -= this.NornamAct(c, element);
                if (element.HP <= 0) element.HP = 0;
                return true;
            }
        });
    }

    //以下是伤害计算的核心公式
    NornamAct(Act: character, BeAct: character): number {
        var HarmPoint = Act.RealTimeAct - BeAct.RealTimeDef;
        if (HarmPoint < 0) HarmPoint = 5;   //命中时候的最低消费
        return HarmPoint;
    }
}