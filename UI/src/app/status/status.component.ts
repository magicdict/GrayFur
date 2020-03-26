import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { character, doubleSoul } from '../Modal/character';
import { GameEngine } from '../Core/gameEngine.service';


@Component({
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  constructor(private ge: GameEngine,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.c = this.ge.currentRole;
    if (this.c instanceof doubleSoul) {
      this.d = this.c;
    }
  }

  public c: character;
  public d: doubleSoul;
  public PageIdx: number = 1;

  Exit() {
    console.log("jump to pictorialbook")
    this.router.navigateByUrl("pictorialbook");
  }

}
