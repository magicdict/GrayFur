import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { SceneComponent } from './scene/scene.component';


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
  { path: '', redirectTo: 'scene', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
