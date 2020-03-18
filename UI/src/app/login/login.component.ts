import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../module/GameEngine.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private ge: GameEngine,
    private router: Router,
  ) { }

  Start() {
    console.log("jump to status");
    this.ge.NewGame();
    this.router.navigateByUrl("scene");
  }
  MiniGame(){
    this.router.navigateByUrl("minigame");
  }
  Load() {
    this.ge.Load();
    this.router.navigateByUrl("scene");
  }
}
