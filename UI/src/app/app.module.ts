import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { GameEngine } from './module/GameEngine.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameEngine],
  bootstrap: [AppComponent]
})
export class AppModule { }
