import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';

@Injectable()
export class SceneMgr {
    constructor(public http: HttpClient) { }

    SceneInfoList: SceneInfo[];
    public static sceneName: string = "Scene0000";    //场景编号
    public static lineIdx: number = 0;    //台词位置
    public Load() {
        let x = this.http.get("assets/json/sceneInfo.json").toPromise().then(x => x as SceneInfo[]);
        x.then(
            r => {
                this.SceneInfoList = r;
            }
        )
    }
    public getSceneInfoByName(SceneName: string): SceneInfo {
        return this.SceneInfoList.find(x => x.Name === SceneName);
    }
    
    public static getSceneInfoByName_Debug(SceneName: string): SceneInfo {
        switch (SceneName) {
            case "Scene0000":
                return Scene0000;
            case "Scene0001":
                return Scene0001;
            case "Scene0011":
                return Scene0011;
            case "Scene0012":
                return Scene0012;
            default:
                break;
        }
    }
}

export const FightPrefix = "[FightScene]";

export interface SceneInfo {
    Name: string;
    Title: string;
    Lines: string[];
    Background: string;
    NextScene?: string;
    Branch?: [string, string][]
}

export const Scene0000: SceneInfo = {
    Name: "Scene0000",
    Title: "引子 穿越的唐家三少",
    Background: "唐门",
    Lines: [
        "唐门唐三@我知道，偷入内门，偷学本门绝学罪不可恕，门规所不容。但唐三可以对天发誓，绝未将偷学到的任何一点本门绝学泄露与外界。",
        "唐门唐三@我说这些，并不是希望得到长老们的宽容，只是想告诉长老们，唐三从未忘本。以前没有，以后也没有。",
        "唐门唐三@唐三的一切都是唐门给的，不论是生命还是所拥有的能力，都是唐门所赋予，不论什么时候，唐三生是唐门的人，死是唐门的鬼，",
        "唐门唐三@我知道，长老们是不会允许我一个触犯门规的外门弟子尸体留在唐门的，既然如此，就让我骨化于这巴蜀自然之中吧。",
    ],
    NextScene: "Scene0001"
};

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

export const Scene0012: SceneInfo = {
    Name: "Scene0012",
    Title: "史莱克学院",
    Background: "史莱克学院",
    Lines: [
        "小舞@史莱克学院的赵无极老师及其厉害，小心对付啊。",
        FightPrefix + "Battle0002",
        "唐三@终于通过史莱克学院的入学测试了！奥力给！",
    ]
};
