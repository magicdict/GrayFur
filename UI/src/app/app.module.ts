import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { GameEngine } from './module/GameEngine.service';
import { SceneComponent } from './scene/scene.component';
import { FormationComponent } from './formation/formation.component';
import { FightComponent } from './fight/fight.component';
import { FormationItemComponent } from './formation/formationItem.component';

import { MiniGameComponent } from './miniGame/miniGame.component';
import { GameCellComponent } from './miniGame/GameCell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SceneComponent,
    StatusComponent,
    FormationComponent,
    FormationItemComponent,
    FightComponent,
    MiniGameComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameEngine],
  bootstrap: [AppComponent]
})
export class AppModule { }
