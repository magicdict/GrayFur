import { character, characterStatus, Buffer } from '../Modal/character';
import { BattleInfo } from '../Modal/BattleInfo';
import { GameEngine } from './GameEngine.service';
import { Output, EventEmitter } from '@angular/core';
import { RPGCore } from '../Modal/RPGCore';


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

    InitRole(c: character) {
        if (c === undefined) return;
        c.HP = c.RealMaxHP;
        c.MP = c.RealMaxMP;
        c.BufferStatusList = new Array<Buffer>();
    }

    NewTurn() {
        console.log("新的回合");
        this.TurnList = new Array<character>();
        //所有HP不为0的角色进入回合列表
        this.MyTeam.forEach(element => {
            if (element !== undefined && element.HP > 0) {
                //状态修正,之前可能需要进行中毒等状态的结算
                element.BufferTurnDown();
                let block = element.BufferStatusList.find(x => x[0] === characterStatus.束缚);
                if (block === undefined) this.TurnList.push(element);
            }
        });
        this.Enemy.forEach(element => {
            if (element !== undefined && element.HP > 0) {
                //状态修正,之前可能需要进行中毒等状态的结算
                element.BufferTurnDown();
                let block = element.BufferStatusList.find(x => x[0] === characterStatus.束缚);
                if (block === undefined) this.TurnList.push(element);
            }
        });

        if (this.TurnList.length === 0) {
            //这里可能出现战场所有角色都无法行动的状态   
            console.log("没有可以活动的角色，回合结束");
            this.NewTurn();
        } else {
            //速度升序排序
            this.TurnList.sort((x, y) => { return x.RealSpeed - y.RealSpeed });
            let Role = this.TurnList.pop();
            console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
            if (Role.IsMyTeam) {
                this.currentActionCharater = Role;
            } else {
                //AI For Enemy
                RPGCore.EnemyAI(Role, this);
                this.ActionDone();
            }
        }
    }

    //当前角色动作完成
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
            this.MyTeam.forEach(element => { this.InitRole(element) });
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
                        RPGCore.EnemyAI(Role, this);
                    } else {
                        Role.AI(Role, this);
                    }
                    this.ActionDone();
                }
            }
        }
    }
}