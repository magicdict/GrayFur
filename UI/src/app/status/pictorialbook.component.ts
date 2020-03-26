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

    Exit() {
        console.log("jump to scene")
        this.router.navigateByUrl("scene");
    }

}
