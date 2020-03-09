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
    this.ge.InitRole();
    this.ge.InitGameStatus();
    this.router.navigateByUrl("scene");
  }
  Load() {
    this.ge.Load();
  }
}
