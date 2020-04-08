import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';
import { ToolInfo } from '../Modal/ToolInfo';
import { ResourceMgr } from '../Core/ResourceMgr';
import { BagMgr } from '../Core/BagMgr';

@Component({
  templateUrl: './store.component.html',
})
export class StoreComponent {
  constructor(public ge: GameEngine,
    private router: Router,
    public bagmgr:BagMgr
  ) { }
  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  iconMgr = ResourceMgr;
  Buy(tool:ToolInfo){
    this.bagmgr.Money -= tool.Price;
    this.bagmgr.changeTool([tool.Name,1]);
  }  
  Exit() {
    console.log("jump to scene")
    this.router.navigateByUrl("scene");
  }
}
