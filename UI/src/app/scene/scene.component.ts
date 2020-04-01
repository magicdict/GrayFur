import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '../Modal/character';
import { GameEngine } from '../Core/gameEngine.service';
import { SceneInfo, FightPrefix, ChangeScenePrefix, getSceneInfoByName } from '../Modal/SceneInfo';


@Component({
  templateUrl: './scene.component.html',
})
export class SceneComponent implements OnInit {
  constructor(private ge: GameEngine,
    private router: Router,
  ) { }
  



  public c: character;

  ngOnInit(): void {
    this.c = this.ge.唐三;
    this.scene = getSceneInfoByName(this.ge.gamestatus.sceneName);
    this.lines = this.scene.Lines;
    this.line = this.lines[this.ge.gamestatus.lineIdx].split("@")[1]
    this.faceurl = this.lines[this.ge.gamestatus.lineIdx].split("@")[0]
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  scene: SceneInfo;
  lines: string[];
  line: string;
  faceurl: string;
  Next() {
    this.ge.gamestatus.lineIdx++;
    if (this.ge.gamestatus.lineIdx >= this.lines.length) return;
    let RawInfo = this.lines[this.ge.gamestatus.lineIdx];

    //战斗
    if(RawInfo.startsWith(FightPrefix)){
      var fightname = RawInfo.substr(FightPrefix.length);
      this.ge.gamestatus.fightname = fightname;
      console.log("jump to fight" + fightname);
      this.router.navigateByUrl("fight");
    }

    //转场
    if(RawInfo.startsWith(ChangeScenePrefix)){
      var NextScene = RawInfo.substr(ChangeScenePrefix.length);
      console.log("Scene Chnage To:" + NextScene);
      this.ge.gamestatus.sceneName = NextScene;
      this.ge.gamestatus.lineIdx = 0;
      this.scene = getSceneInfoByName(NextScene);
      this.lines = this.scene.Lines;
      RawInfo = this.lines[this.ge.gamestatus.lineIdx];
    }

    //台词
    this.line = RawInfo.split("@")[1];
    this.faceurl = RawInfo.split("@")[0]
  }


  Store(){
    this.router.navigateByUrl("store");
  }

  Status() {
    this.router.navigateByUrl("pictorialbook");
  }

  Exit(){
    console.log("jump to login")
    this.ge.Save();
    this.router.navigateByUrl("login");
  }
}
