import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
  ],
  declarations: [
    UsuarioComponent
  ]
})
export class UsuarioModule { }
