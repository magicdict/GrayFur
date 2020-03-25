import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';
import { ToolInfo } from '../Modal/ToolInfo';

@Component({
  templateUrl: './store.component.html',
})
export class StoreComponent {
  constructor(public ge: GameEngine,
    private router: Router,
  ) { }
  Buy(tool:ToolInfo){
    this.ge.gamestatus.Money -= tool.Price;
    this.ge.gamestatus.changeTool([tool.Name,1]);
  }  
  Exit() {
    console.log("jump to scene")
    this.router.navigateByUrl("scene");
  }
}
