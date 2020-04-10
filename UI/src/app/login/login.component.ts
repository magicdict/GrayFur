import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';



@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private ge: GameEngine,
    private router: Router,
  ) {

  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  Start() {
    this.ge.NewGame();
    this.router.navigateByUrl("scene");
  }
  MiniGame() {
    this.router.navigateByUrl("minigame");
  }
  MiniGame2() {
    this.router.navigateByUrl("minigame2");
  }
  Load() {
    this.ge.LoadGame();
    this.router.navigateByUrl("scene");
  }
}
