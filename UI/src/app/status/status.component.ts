import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { character, doubleSoul } from '../Modal/character';
import { GameEngine } from '../Core/gameEngine.service';
import { IconMgr } from '../Core/IconMgr';


@Component({
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  constructor(public ge: GameEngine,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  iconMgr = IconMgr;
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.c = this.ge.GetRoleByName(params['name']);
        if (this.c instanceof doubleSoul) {
          this.d = this.c;
        }
      }
    );
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  public c: character;
  public d: doubleSoul;
  public PageIdx: number = 1;

  Exit() {
    console.log("jump to pictorialbook")
    this.router.navigateByUrl("pictorialbook");
  }

}
