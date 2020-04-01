import { character, characterStatus, Buffer } from '../Modal/character';
import { BattleInfo } from '../Modal/BattleInfo';
import { GameEngine } from './GameEngine.service';
import { Output, EventEmitter } from '@angular/core';
import { RPGCore } from './RPGCore';


export class FightStatus {
    IsDebugMode: boolean = true;
    Enemy: character[];
    MyTeam: character[];
    info: BattleInfo;
    gameengine: GameEngine;
    currentActionCharater: character;
    @Output() ResultEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output() EnemyAction: EventEmitter<string> = new EventEmitter<string>();
    //列出当前所有战场角色的速度列表，每一回合的出手顺序根据速度来实现
    TurnList: Array<character>;
    TurnCnt: number = 0;
    Exp: number = 0;
    constructor(battleinfo: BattleInfo, ge: GameEngine) {
        this.info = battleinfo;
        this.gameengine = ge;
        this.Enemy = battleinfo.Enemy.map(x => ge.GetRoleByName(x));
        this.Enemy.forEach(element => {
            if (element !== undefined) {
                element.IsMyTeam = false;
                this.InitRole(element);
                this.Exp += element.GetExpWhenDefeat;
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

    InitRole(c: character) {
        if (c === undefined) return;
        while (c.Exp >= c.NextNeedExp) {
            c.Exp -= c.NextNeedExp;
            c.LV++;
        }
        c.Skill.forEach(
            skill => {
                //人物魂技设定：人物技能都是各自New出来的独立对象
                //冷却回合数
                skill.CurrentColdDown = skill.ColdDownTurn;
                //可用性的设定
                let o = Math.floor(c.LV / 10)
                skill.IsMaster = skill.Order <= o;
            }
        )
        c.HP = c.RealMaxHP;
        c.MP = c.RealMaxMP;
        c.BufferList = new Array<Buffer>();
    }

    NewTurn() {
        this.TurnCnt++;
        console.log("新的回合:" + this.TurnCnt);
        this.TurnList = new Array<character>();
        //所有HP不为0的角色进入回合列表
        this.MyTeam.forEach(element => {
            if (element !== undefined && element.HP > 0) {
                //状态修正,之前可能需要进行中毒等状态的结算
                element.BufferTurnDown();
                if (element.HP > 0) this.TurnList.push(element);
            }
        });
        this.Enemy.forEach(element => {
            if (element !== undefined && element.HP > 0) {
                //状态修正,之前可能需要进行中毒等状态的结算
                element.BufferTurnDown();
                if (element.HP > 0) this.TurnList.push(element);
            }
        });
        if (this.IsDebugMode) this.PrintStatus();
        if (this.TurnList.length === 0) {
            //这里可能出现战场所有角色都无法行动的状态   
            console.log("没有可以活动的角色，回合结束");
            this.NewTurn();
        } else {
            //速度升序排序
            this.TurnList.sort((x, y) => { return x.RealSpeed - y.RealSpeed });
            //寻找第一个行动的人
            var IsFirstRun = false;
            while (!IsFirstRun) {
                let Role = this.TurnList.pop();
                console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
                let block = Role.StatusList.find(x => x === characterStatus.束缚 || x === characterStatus.晕眩);
                if (block === undefined) {
                    console.log("本回合第一个行动的人：" + Role.Name);
                    this.currentActionCharater = Role;
                    if (!Role.IsMyTeam) {
                        //AI For Enemy
                        this.EnemyAction.emit(RPGCore.EnemyAI(Role, this));
                        this.ActionDone();
                    }
                    IsFirstRun = true;
                } else {
                    console.log(Role.Name + ":角色被束缚");
                }
                if (this.TurnList.length === 0) IsFirstRun = true;
            }
        }
    }

    /**调试用方法，打印战场状态 */
    PrintStatus() {
        console.log("我方状态：")
        this.MyTeam.forEach(element => {
            if (element !== undefined) {
                console.log("Name:" + element.Name + "\tHP" + element.HP + "/" + element.RealMaxHP + "\tMP" + element.MP + "/" + element.RealMaxMP);
                console.log("Name:" + element.Name + "\tAct" + element.RealTimeAct + "\tDef" + element.RealTimeDef + "\tSpd" + element.RealSpeed);
            }
        });
        console.log("敌方状态：")
        this.Enemy.forEach(element => {
            if (element !== undefined) {
                console.log("Name:" + element.Name + "\tHP" + element.HP + "/" + element.RealMaxHP + "\tMP" + element.MP + "/" + element.RealMaxMP);
                console.log("Name:" + element.Name + "\tAct" + element.RealTimeAct + "\tDef" + element.RealTimeDef + "\tSpd" + element.RealSpeed);
            }
        });
    }

    /**当前角色动作完成 */
    ActionDone() {
        //胜负统计
        let MyTeamLive = this.MyTeam.find(x => x !== undefined && x.HP > 0);
        if (MyTeamLive === undefined) {
            console.log("团灭");
            this.MyTeam.forEach(element => { this.InitRole(element) });
            this.ResultEvent.emit(0);
            return;
        }

        let EnemyTeamLive = this.Enemy.find(x => x !== undefined && x.HP > 0);
        if (EnemyTeamLive === undefined) {
            console.log("胜利");
            //这里需要还原MyTeam的队列
            this.MyTeam = this.info.MyTeam.map(x => this.gameengine.GetRoleByName(x));
            this.MyTeam.forEach(element => {
                if (element !== undefined) {
                    element.Exp += this.Exp;
                    this.InitRole(element)
                }
            });
            this.ResultEvent.emit(1);
            return;
        }

        //气绝者去除
        this.MyTeam = this.MyTeam.map(x => (x !== undefined && x.HP > 0) ? x : undefined);
        this.Enemy = this.Enemy.map(x => (x !== undefined && x.HP > 0) ? x : undefined);
        this.TurnList = this.TurnList.map(x => (x !== undefined && x.HP > 0) ? x : undefined);
        this.TurnList = this.TurnList.filter(x => x !== undefined);
        
        if (this.TurnList.length == 0) {
            console.log("回合结束");
            this.NewTurn();
        } else {
            let Role = this.TurnList.pop();
            let block = Role.StatusList.find(x => x === characterStatus.束缚 || x === characterStatus.晕眩);

            if (Role === undefined || block !== undefined) {
                console.log(Role.Name + ":角色已经气绝,或者角色被束缚");
                this.ActionDone();
            } else {
                console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
                this.currentActionCharater = Role;
                if (!Role.IsMyTeam) {
                    //AI For Enemy
                    this.EnemyAction.emit(RPGCore.EnemyAI(Role, this));
                    this.ActionDone();
                }
            }
        }
    }
}