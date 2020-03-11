import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '../module/character';
import { GameEngine } from '../module/GameEngine.service';
import { SceneInfo, FightPrefix, ChangeScenePrefix, getSceneInfoByName } from '../module/SceneInfo';


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
    this.scene = getSceneInfoByName(this.ge.status.sceneName);
    this.lines = this.scene.Lines;
    this.line = this.lines[this.ge.status.lineIdx].split("@")[1]
    this.faceurl = this.lines[this.ge.status.lineIdx].split("@")[0]
  }

  scene: SceneInfo;
  lines: string[];
  line: string;
  faceurl: string;
  Next() {
    this.ge.status.lineIdx++;
    if (this.ge.status.lineIdx >= this.lines.length) return;
    let RawInfo = this.lines[this.ge.status.lineIdx];

    //战斗
    if(RawInfo.startsWith(FightPrefix)){
      var fightname = RawInfo.substr(FightPrefix.length);
      this.ge.status.fightname = fightname;
      console.log("jump to fight" + fightname);
      this.router.navigateByUrl("fight");
    }

    //转场
    if(RawInfo.startsWith(ChangeScenePrefix)){
      var NextScene = RawInfo.substr(ChangeScenePrefix.length);
      console.log("Scene Chnage To:" + NextScene);
      this.ge.status.sceneName = NextScene;
      this.ge.status.lineIdx = 0;
      this.scene = getSceneInfoByName(NextScene);
      this.lines = this.scene.Lines;
      RawInfo = this.lines[this.ge.status.lineIdx];
    }

    //台词
    this.line = RawInfo.split("@")[1];
    this.faceurl = RawInfo.split("@")[0]
  }
  Status(idx:number) {
    if (idx === 1) this.ge.currentRole = this.ge.唐三;
    if (idx === 2) this.ge.currentRole = this.ge.小舞;
    this.router.navigateByUrl("status");
  }

  Fight(){
    console.log("jump to fight")
    this.router.navigateByUrl("fight");
  }

  Exit(){
    console.log("jump to login")
    this.router.navigateByUrl("login");
  }
}
