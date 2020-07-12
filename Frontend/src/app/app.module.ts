import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app-routing.module';
import { MainModule } from './Main/main.module';
import { LoginModule } from './Login/login.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { AppComponent } from './app.component';
import { LbdModule } from './lbd/lbd.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    LbdModule,
    BrowserModule,
    MainModule,
    LoginModule,
    UsuarioModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
