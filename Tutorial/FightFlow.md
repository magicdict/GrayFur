# 战斗流程

    ver0.02 2020/03/30

## 回合开始

每一个回合开始的时候，首先对上一个回合进行一次清算。

- 状态回合数的递减
- 中毒状态的伤害计算

```typescript
    BufferTurnDown() {
        this.BufferList.forEach(element => {
            if (element.Status.find(x => x === characterStatus.中毒) !== undefined) {
                //中毒状态，如果存在HP伤害部分，则这里处理，由于使用了get自动属性功能，Real系的都会自动计算
                if (element.HPFactor !== undefined) this.HP += this.HP * element.HPFactor;
                if (element.HPValue !== undefined) this.HP += element.HPValue;
            }
            element.Turns -= 1;
        });
        this.BufferList = this.BufferList.filter(x => x.Turns > 0);
    }
```
  
> 极端情况下，敌我双方都可能被束缚，无法行动，所以先做一下判断是否有可以行动的角色。

按照出手速度，将所有角色放在一个数组里面，然后决定第一个出手的人，如果是我方人员，等待用户界面的指令输入，如果是敌方的话，则使用AI进行行动。无论是AI还是用户界面的指令，一旦完成，则执行ActionDone方法，进行胜负判定，切换当前的行动角色。

```typescript
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
            let block = Role.BufferStatusList.find(x => x.Status === characterStatus.束缚);

            if (Role === undefined || block !== undefined) {
                console.log(Role.Name + ":角色已经气绝,或者角色被束缚");
                this.ActionDone();
            } else {
                console.log("当前角色：" + Role.Name + "[" + Role.IsMyTeam + "]");
                this.currentActionCharater = Role;
                if (!Role.IsMyTeam) {
                    //AI For Enemy
                    RPGCore.EnemyAI(Role, this);
                    this.ActionDone();
                }
            }
        }
    }
```

>这里使用了@Output()的EventEmitter<>向外部发送消息战斗结束。由于敌方AI运行速度极快，所以这里没有发送消息给用户界面指示我方可以行动了。

```typescript
    ngOnInit(): void {
        this.ge.InitFightStatus();
        this.Message = this.ge.fightStatus.currentActionCharater.Name + "的行动";
        this.ge.fightStatus.ResultEvent.subscribe((x) => {
            if (x === 0) {
                this.FightResultTitle = "团灭了......魂力不足"
                this.ge.gamestatus.lineIdx--;
            } else {
                this.FightResultTitle = "胜利了......奥力给"
                this.ge.gamestatus.lineIdx++;
            }
            this.FightEnd = true;
            console.log("jump to scene");
            setTimeout(() => { this.router.navigateByUrl("scene"); }, 3000);
        }, null, null);
    }
```

>EventEmitter在用户界面使用subscribe进行订阅