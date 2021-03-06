import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { SceneComponent } from './scene/scene.component';
import { FightComponent } from './fight/fight.component';
import { MiniGameComponent } from './miniGame/miniGame.component';
import { StoreComponent } from './store/store.component';
import { MiniGame2Component } from './miniGame/miniGame2.component';
import { PictorialBookComponent } from './status/pictorialbook.component';
import { ForestComponent } from './forest/forest.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pictorialbook',
    component: PictorialBookComponent
  },
  {
    path: 'status/:name',
    component: StatusComponent
  },
  {
    path: 'scene',
    component: SceneComponent
  },
  {
    path: 'fight',
    component: FightComponent
  },
  {
    path: 'minigame',
    component: MiniGameComponent
  },
  {
    path: 'minigame2',
    component: MiniGame2Component
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'forest',
    component: ForestComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
