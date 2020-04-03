import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { GameEngine } from './Core/gameEngine.service';
import { SceneComponent } from './scene/scene.component';
import { FormationComponent } from './formation/formation.component';
import { FightComponent } from './fight/fight.component';
import { FormationItemComponent } from './formation/formationItem.component';

import { MiniGameComponent } from './miniGame/miniGame.component';
import { MiniGame2Component } from './miniGame/miniGame2.component';
import { GameCellComponent } from './miniGame/GameCell.component';
import { StoreComponent } from './store/store.component';
import { PictorialBookComponent } from './status/pictorialbook.component';
import { ToastService } from './toasts/toast-service';
import { ToastsContainer } from './toasts/toast-container.component';
import { BattleMgr } from './Core/BattleMgr';
import { SceneMgr } from './Core/SceneMgr';
import { BagMgr } from './Core/BagMgr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SceneComponent,
    StoreComponent,
    PictorialBookComponent,
    StatusComponent,
    FormationComponent,
    FormationItemComponent,
    FightComponent,
    MiniGameComponent,
    MiniGame2Component,
    GameCellComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    GameEngine,
    ToastService,
    BattleMgr,
    SceneMgr,
    BagMgr],
  bootstrap: [AppComponent]
})
export class AppModule { }
