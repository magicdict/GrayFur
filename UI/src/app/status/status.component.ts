import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '../module/character';
import { GameEngine } from '../module/GameEngine.service';


@Component({
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit{
  constructor(private ge: GameEngine,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.c = this.ge.t3;
  }


  public c : character;

  Exit(){
    console.log("jump to scene")
    this.router.navigateByUrl("scene");
  }

}
