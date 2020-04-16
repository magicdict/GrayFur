/**技能类型 */
export enum enmSkillType {
    /**攻击 */
    Attact,
    /**治疗 */
    Heal,
    /**光环和状态  */
    Buffer,
    /**召唤 */
    Summon,
    /**其他暂时用代码无法实现的魂技 */
    NotImplemented
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

/**魂骨位置 */
export enum BonePosition {
    头骨,
    左臂骨,
    右臂骨,
    左腿骨,
    右腿骨,
    躯干骨,
    外附魂骨
}

export enum enmSpecialSoul{
    残次魂灵,
    不屈魂灵,
    传承魂灵,
    伴生魂灵,
    本命魂灵,
    神灵
}