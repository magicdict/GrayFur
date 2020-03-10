import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { SceneComponent } from './scene/scene.component';
import { FightComponent } from './fight/fight.component';


const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'status',
    component:StatusComponent
  },
  {
    path:'scene',
    component:SceneComponent
  },
  {
    path:'fight',
    component:FightComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
