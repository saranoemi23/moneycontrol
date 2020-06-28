import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './Main/main.module';
import { LoginModule } from './Login/login.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { AppComponent } from './app.component';

const routes: Routes = [
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    AppRoutingModule,
    MainModule,
    LoginModule,
    UsuarioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
