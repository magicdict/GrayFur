import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '../module/character';
import { GameEngine } from '../module/GameEngine.service';
import { SceneInfo } from '../module/SceneInfo';


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
    this.scene = this.ge.getLinesBySceneIdx();
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
    this.line = this.lines[this.ge.status.lineIdx].split("@")[1];
    this.faceurl = this.lines[this.ge.status.lineIdx].split("@")[0]
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
