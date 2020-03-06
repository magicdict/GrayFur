import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './status.component.html',
})
export class StatusComponent {
  constructor(private router: Router){
    
  }

  Exit(){
    console.log("jump to main")
    this.router.navigateByUrl("login");
  }

}
