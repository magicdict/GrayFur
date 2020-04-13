import { Component, OnInit } from '@angular/core';
import VConsole from 'vconsole';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    var vconsole = new VConsole();
  }
  title = 'RPG';
}
