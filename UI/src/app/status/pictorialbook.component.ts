import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngine } from '../Core/gameEngine.service';


@Component({
    templateUrl: './pictorialbook.component.html',
})
export class PictorialBookComponent {
    constructor(public ge: GameEngine,
        public router: Router,
    ) { }
    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    Status(name:string){
        this.router.navigateByUrl('status/' + name);
    }

    Exit() {
        console.log("jump to scene")
        this.router.navigateByUrl("scene");
    }

}
