import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '../module/character';
import { GameEngine } from '../module/GameEngine.service';


@Component({
  templateUrl: './scene.component.html',
})
export class SceneComponent implements OnInit{
  constructor(private ge: GameEngine,
    private router: Router,
  ) { }

  public c : character;

  ngOnInit(): void {
    this.c = this.ge.t3;
    this.lines = [
      "唐门/唐三@我知道，偷入内门，偷学本门绝学罪不可恕，门规所不容。但唐三可以对天发誓，绝未将偷学到的任何一点本门绝学泄露与外界。",
      "唐门/唐三@我说这些，并不是希望得到长老们的宽容，只是想告诉长老们，唐三从未忘本。以前没有，以后也没有。",
      "唐门/唐三@唐三的一切都是唐门给的，不论是生命还是所拥有的能力，都是唐门所赋予，不论什么时候，唐三生是唐门的人，死是唐门的鬼，",
      "唐门/唐三@我知道，长老们是不会允许我一个触犯门规的外门弟子尸体留在唐门的，既然如此，就让我骨化于这巴蜀自然之中吧。",
      "唐门/长老@玄天宝录，你竟然连玄天宝录中本门最高内功也学了？"
    ]
    this.line = this.lines[this.lineIdx];
    this.faceurl = this.lines[this.lineIdx].split("@")[0]
  }

  lines : string[];
  lineIdx = 0;  
  line:string;
  faceurl:string;
  Next(){
    this.lineIdx++;
    this.line = this.lines[this.lineIdx].split("@")[1];
    this.faceurl = this.lines[this.lineIdx].split("@")[0]
  }

}
