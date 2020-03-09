export class character {
    Name: string;   //姓名
    LV:number;      //等级
    MaxHP: number;  //最大生命值
    HP: number;     //生命值
    MaxMP: number;  //最大魔法值（魂力）
    MP: number;         //魔法值（魂力）
    Description:string; //简介
    Soul :string;
    TeamPosition:string;
    Skill:string[];
    constructor(theName: string) { this.Name = theName; }
}