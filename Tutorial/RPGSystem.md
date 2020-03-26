# RPG系统构造

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
    Order: number;   //第N魂技
    SkillType: enmSkillType;
    Range: enmRange;
    Direct: enmDirect;
    Description: string;
    Source: string;
    get MpUsage(): number {
        return Math.pow(2, this.Order);
    }
    /**武魂融合技的融合者列表 */
    Combine: string[];
    abstract Excute(c: character, fs: FightStatus): void;
    /**自定义执行方法 */
    CustomeExcute(c: character, fs: FightStatus): boolean {
        return false;
    }
    //攻击并中毒这样的两个效果叠加的技能
    AddtionSkill: SkillInfo = undefined;
}

export class AttactSkillInfo extends SkillInfo {
    SkillType = enmSkillType.Attact;
    Harm: number;
    Excute(c: character, fs: FightStatus) {
        //如果自定义方法被执行，则跳过后续代码
        if (this.CustomeExcute(c, fs)) return;
        let factor = fs.currentActionCharater.LV / 100;
        c.HP -= Math.round(this.Harm * factor);
        if (c.HP <= 0) c.HP = 0;
        //如果需要产生其他效果
        if (this.AddtionSkill !== undefined) this.AddtionSkill.Excute(c, fs);
    }
}
```

> undefined来检测是否拥有对象

## 剧情

剧情暂时使用传统的列表在当前位置指针方式来制作

```typescript
export const FightPrefix = "[FightScene]";
export const ChangeScenePrefix = "[ChangeScene]";
export const Scene0000: SceneInfo = {
    Title: "引子 穿越的唐家三少",
    Background: "唐门",
    Lines: [
        "唐门唐三@我知道，偷入内门，偷学本门绝学罪不可恕，门规所不容。但唐三可以对天发誓，绝未将偷学到的任何一点本门绝学泄露与外界。",
        FightPrefix + "Battle0001",
        "唐门唐三@我说这些，并不是希望得到长老们的宽容，只是想告诉长老们，唐三从未忘本。以前没有，以后也没有。",
        "唐门唐三@唐三的一切都是唐门给的，不论是生命还是所拥有的能力，都是唐门所赋予，不论什么时候，唐三生是唐门的人，死是唐门的鬼，",
        "唐门唐三@我知道，长老们是不会允许我一个触犯门规的外门弟子尸体留在唐门的，既然如此，就让我骨化于这巴蜀自然之中吧。",
        "唐门长老@玄天宝录，你竟然连玄天宝录中本门最高内功也学了？",
        "唐门唐三@赤裸而来，赤裸而去，佛怒唐莲算是唐三最后留给本门的礼物。",
        "唐门唐三@现在，除了我这个人以外，我再没有带走唐门任何东西，秘籍都在我房间门内第一块砖下。唐三现在就将一切都还给唐门。",
        "唐门唐三@哈哈哈哈哈哈哈……。",
        "唐门长老@等一下。",
        "唐门唐三@(云雾很浓，带着阵阵湿气，带走了阳光，也带走了那将一生贡献给了唐门和暗器的唐三。)",
        ChangeScenePrefix + "Scene0001"
    ]
};
```

这里使用 FightPrefix表示进入战斗，ChangeScenePrefix表示场景转换。对话列表则使用@符号将角色和台词进行区分。

## 道具系统

可以将道具看作一种特殊的技能,只是这种技能是可以购买的。当然特殊的剧情道具则不属于这个范畴，设计起来比较复杂，需要配合场景的通过条件来使用。

```typescript
export enum enmToolType {
    /**暗器 */
    HiddenWeapon,
    /**可购入的一般道具 */
    StoreItem,
    /**剧情道具 */
    Spacial
}
```

### ver0.01 2020/03/25
