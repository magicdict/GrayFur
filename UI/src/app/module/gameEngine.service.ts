import { Injectable } from "@angular/core";
import { character } from './character';
import { DataStorage } from './datastorage';

@Injectable()
export class GameEngine {
    constructor(private localstorage: DataStorage) {

    }
    public t3: character;
    public Init() {
        this.t3 = new character("唐三");
        this.t3.LV = 1;
        this.t3.HP = 100;
        this.t3.MaxHP = 100;
        this.t3.MP = 20;
        this.t3.MaxMP = 20;
        this.t3.Soul = "蓝银皇";
        this.t3.TeamPosition = "控制系";
        this.t3.Description = "唐三前世为巴蜀唐门外门子弟，来到斗罗大陆后与伙伴们一起在异界大陆重新建立了唐门。"
        this.t3.Skill = ["缠绕", 
                        "寄生", 
                        "蛛网束缚",
                        "蓝银囚笼/蓝银突刺阵",
                        "蓝银霸皇枪",
                        "虚无状态/暴杀八段摔",
                        "蓝银真身",
                        "蓝银虎鲸镜之灭/蓝银虎鲸魔之摄",
                        "蓝银天青龙之魂",
                        "海神神环"];
        this.localstorage.Save("唐三", this.t3);
    }
    public Load() {
        var t3 = this.localstorage.Load<character>("唐三")
        if (t3 === null) {
            //没有存档，则新建一个存档
            this.Init();
        }
    }
}