# RPG系统构造

ver0.03 2020/04/10

## 人物

和其他RPG游戏类似，游戏里面的人物角色大致有这样的一些属性：生命值，魔法值（魂力），攻击力，防御力，速度。RPG游戏中的角色随着等级的提高，这些属性都会提升，属性提升的快慢则取决于资质，同时，由于在实际战斗中，会出现各种增益和光环效果，这些值都是动态变化的，所以这里将这些属性都设置了Base和Real两套数据。

Base属性是指人物的初始属性，是一种固有属性，在整个游戏开始的时候就固定下来的。然后每个人物根据不同的资质，有一个成长值，例如SSR的角色，成长值可以是1.5，普通角色是1。这个成长值关系到每提升一个等级，角色属性的增加值，代码大致如下：

```typescript
    /**经过增益之后的生命最大值 */
    get RealMaxHP(): number {
        var R = this.BaseMaxHP + (this.LV - 1) * this.MaxHPUpPerLv * this.GrowthFactor;
        ...
        ...
        ...
        return Math.round(R);
    }
```

这里的 MaxHPUpPerLv 表示每个等级的最大生命值提升数值，GrowthFactor则表示成长值。

> 注意：这里使用了TypeScript的get属性，也就是只读/计算属性来处理Real系的属性，这些属性都是实时计算出来的！

在小说里面，经常可以看到3成功力的角色，为了表示这种情况，代码里面还设定了一个Factor变量，通过这个变量可以设定整体的缩放比例。这个值默认为1，表示不缩放。

```typescript
    /**经过增益之后的生命最大值 */
    get RealMaxHP(): number {
        var R = this.BaseMaxHP + (this.LV - 1) * this.MaxHPUpPerLv * this.GrowthFactor;
        R = R * this.Factor;
        ...
        ...
        ...
        return Math.round(R);
    }
```

> 由于乘法计算会出现小数点，这里使用了Math.round对结果进行取整。

## 技能

技能是一个游戏的战斗核心，所有技能本质上都是为了改变角色状态。如果要具体细分大致可以分为

- 攻击类：对于指定角色产生伤害
- 回复类：对于指定角色，回复生命值和魔法值
- 状态改变类：这里其实包含了Buffer和状态变化两种情况，Buffer类大多是被动技能，游戏中只要某个角色在战场上就获得，并且效果是持续性的。状态变化则一般必须主动施放技能才行，而且持续时间也是有限制的。

同时技能设计的时候，还需要设定使用的方向，既这个技能是对于我方使用，还是敌方使用，还是无差别使用。另外这个技能的对象是某个对象，还是群体。

```typescript
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
```

> 一般使用枚举来编写这样相对固定，项目较少的列表

技能的设计，这里使用了OOP的继承来实现，技能的基类定义了一些共通的属性和抽象方法。设计的时候还考虑到以下几种特殊情况

- 每一种具体技能必须要实现一个执行（施放）方法：Excute，这里使用抽象函数，来强制子类型必须要实现这个方法
- 对于复杂技能，需要有一个自定义的执行方法：CustomeExcute，同时通过返回值来告诉系统是不是该技能有自定义执行方法。则跳过固有的Excute方法。
- 对于有些技能可能要同时实现两种效果，这里增加了AddtionSkill变量

```typescript
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
```

> undefined来检测是否拥有对象

### Buffer技能

Buffer，可以叫做状态增益，本系统的Buffer如下所示：该结构标明了Buffer的作用，来源，剩余回合数，已经对于状态的影响。

其中，状态有常规的攻防增益，中毒，也有一些特殊的，例如施法之后产生的Flag型状态：浴火凤凰,幽冥影分身,飞行等就属于这种特殊状态。

```typescript
/**状态 */
export enum characterStatus {
    /**通用 */
    魂技,
    /**增益 */
    攻击增益,
    防御增益,
    速度增益,
    生命增益,
    魂力增益,

    /**每回合失去生命值 */
    中毒,
    /**无法使用技能 */
    禁言,
    /**无法物理和技能攻击 */
    晕眩,
    /**无法普通攻击，可以使用技能 */
    束缚,
    /**物理攻击免疫 */
    物免,
    /**技能攻击免疫 */
    魔免,
    /**全部免疫 */
    无敌,
    //特色特殊状态:战斗开始的时候将被清除掉
    /**马红俊 */
    浴火凤凰,
    /**朱竹清 */
    幽冥影分身,
    /**香肠效果 */
    飞行
}

/**Buffer */
export class Buffer {
    //Value表示绝对值，Percent表示百分比

    MaxHPValue: number = undefined;
    MaxHPFactor: number = undefined;

    HPValue: number = undefined;
    HPFactor: number = undefined;

    MaxMPValue: number = undefined;
    MaxMPFactor: number = undefined;

    MPValue: number = undefined;
    MPFactor: number = undefined;

    SpeedValue: number = undefined;
    SpeedFactor: number = undefined;

    AttactValue: number = undefined;
    AttactFactor: number = undefined;

    DefenceValue: number = undefined;
    DefenceFactor: number = undefined;
    /**来源 */
    Source: string;
    /**持续回合数 */
    Turns: number = 999;    //默认999回合
    /**状态 */
    Status: characterStatus[] = [characterStatus.魂技];
}
```

在技能里面有一类是Buffer技能，这个时候需要将Buffer放入角色的BufferList中，注意，由于技能描述中的Buffer是对于Skill的描述，是一个类，不能直接放入到人物BufferList中。而应该将Buffer的副本放入人物BufferList中去。

```typescript
/**增益和减弱 */
export class BufferStatusSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Buffer;
    Buffer: Buffer = new Buffer();
    /**Buffer强度是否和施法者等级挂钩？ */

    Excute(c: character, fs: FightStatus) {
        if (this.CustomeExcute(c, fs)) return;
        //增加Buffer来源信息，相同的不叠加
        if (c.BufferList.find(x => x.Source === this.Name) !== undefined) return;
        //增幅强度和等级关联:如果是和施法者相关，必须使用currentActionCharater的信息
        if (this.BufferFactorByLV) {
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
```

具体到斗罗大陆，其技能可能来自于魂骨（类似于极品装备的概念）和魂环，或者角色自身融合技，设计的时候，暂时考虑技能独立体系独立存在，然后分配给魂骨魂环,魂骨魂环分配给人物。用这样的方式将人物和技能串联起来。

```typescript
    public static 唐三(): Character {
        let 唐三 = new Character("唐三");
        唐三.LV = 29;
        唐三.GrowthFactor = 1.5;
        唐三.Bones = [
            BoneCreator.外附魂骨八蛛矛(),
            BoneCreator.天青牛蟒右臂骨(),
            BoneCreator.泰坦巨猿左臂骨(),
            BoneCreator.深海魔鲸王的躯干骨(),
            BoneCreator.精神凝聚之智慧头骨(),
            BoneCreator.蓝银皇右腿骨(),
            BoneCreator.邪魔虎鲸王左腿骨()
        ]
        唐三.TeamPosition = enmTeamPosition.控制系;
        唐三.Description = "唐三前世为巴蜀唐门外门子弟，来到斗罗大陆后与伙伴们一起在异界大陆重新建立了唐门。"
        唐三.Soul = "蓝银皇";
        唐三.Circles = CircleCreator.唐三();
        唐三.SecondSoul = "昊天锤";
        唐三.Fields = [FieldCreator.蓝银领域(), FieldCreator.海神领域(),
        FieldCreator.杀神领域(), FieldCreator.修罗领域()];
        return 唐三;
    }

    public static 邪魔虎鲸王左腿骨(): Bone {
        let e = new Bone();
        e.Name = "邪魔虎鲸王左腿骨";
        e.Position = BonePosition.左腿骨;
        e.FirstSkill = BoneSkillCreator.虎鲸碎牙斩();
        e.SecondSkill = BoneSkillCreator.虎鲸邪魔斧();
        return e;
    }

    //邪魔虎鲸王左腿骨
    public static 虎鲸邪魔斧(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "虎鲸邪魔斧";
        s.Description = "完全作用于攻击，凝全身功力于左腿，经魂骨增幅，化为薄如蝉翼的战斧利刃，直线型单体攻击";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.PickOne;
        s.Harm = 5000;
        return s;
    }

    public static 虎鲸碎牙斩(): SkillInfo {
        let s = new AttactSkillInfo();
        s.Name = "虎鲸碎牙斩";
        s.Description = "群攻技能";
        s.Direct = enmDirect.Enemy;
        s.Range = enmRange.EveryOne;
        s.Harm = 2000;
        return s;
    }
```

## 剧情

每个场景包含了名称，标题，对白（战斗）列表，背景，下一个场景名称和分支的信息。

```typescript
public static lineIdx: number = 0;    //台词位置
export interface SceneInfo {
    Name: string;
    Title: string;
    Lines: string[];
    Background: string;
    NextScene?: string;
    Branch?: [string, string][]
}

export const Scene0001: SceneInfo = {
    Name: "Scene0001",
    Title: "引子 穿越的唐家三少",
    Background: "唐门",
    Lines: [
        "唐门长老@玄天宝录，你竟然连玄天宝录中本门最高内功也学了？",
        "唐门唐三@赤裸而来，赤裸而去，佛怒唐莲算是唐三最后留给本门的礼物。",
        "唐门唐三@现在，除了我这个人以外，我再没有带走唐门任何东西，秘籍都在我房间门内第一块砖下。唐三现在就将一切都还给唐门。",
        "唐门唐三@哈哈哈哈哈哈哈……。",
        "唐门长老@等一下。",
        "唐门唐三@(云雾很浓，带着阵阵湿气，带走了阳光，也带走了那将一生贡献给了唐门和暗器的唐三。)",
    ],
    Branch: [
        ["赵无极试炼", "Scene0011"],
        ["达拉崩巴试炼", "Scene0012"]
    ]
};
```

每次对话发生的时候，lineIdx这个台词位置的指针都会下移，指向下一句台词或者开启战斗。这里使用 FightPrefix表示进入战斗。对话列表则使用@符号将角色和台词进行区分。

```typescript
export const Scene0011: SceneInfo = {
    Name: "Scene0011",
    Title: "史莱克学院",
    Background: "史莱克学院",
    Lines: [
        "小舞@史莱克学院的赵无极老师及其厉害，小心对付啊。",
        FightPrefix + "Battle0001",
        "唐三@终于通过史莱克学院的入学测试了！奥力给！",
    ]
};
```

## 道具系统

可以将道具看作一种特殊的技能,只是这种技能是可以购买的。当然特殊的剧情道具则不属于这个范畴，设计起来比较复杂，需要配合场景的通过条件来使用。

```typescript
import { SkillInfo } from './SkillInfo';

/** 道具 */
export class ToolInfo {
    /** 名字 */
    Name: string;
    /** 图标 */
    Icon: string;
    /** 价格 */
    Price: number;
    /** 道具和技能可以合并 */
    Func: SkillInfo;
    /**道具类型 */
    ToolType: enmToolType = enmToolType.StoreItem;
}

export class HiddenWeapon extends ToolInfo {
    ToolType = enmToolType.HiddenWeapon;
};

export enum enmToolType {
    /**暗器 */
    HiddenWeapon,
    /**可购入的一般道具 */
    StoreItem,
    /**剧情道具 */
    Spacial
}

public static 佛怒唐莲(): ToolInfo {
    let t = new ToolInfo();
    t.ToolType = enmToolType.HiddenWeapon;
    t.Name = "佛怒唐莲";
    t.Icon = ResourceMgr.icon_attact;
    t.Func = ToolSkillCreator.佛怒唐莲();
    t.Price = 99999;
    return t;
}
```
