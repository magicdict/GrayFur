import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Character } from '../Modal/Character';
import { GameEngine } from '../Core/gameEngine.service';
import { ResourceMgr } from '../Core/ResourceMgr';


@Component({
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  constructor(public ge: GameEngine,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  iconMgr = ResourceMgr;
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.character = this.ge.GetRoleByName(params['name']);
      }
    );
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  public character: Character;
  public PageIdx: number = 1;

  Exit() {
    console.log("jump to pictorialbook")
    this.router.navigateByUrl("pictorialbook");
  }

}
