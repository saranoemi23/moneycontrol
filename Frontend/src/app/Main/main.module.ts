import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import axios from 'axios';
axios.defaults.withCredentials = true;

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ListarComponent } from '../Transaccion/listar/listar.component';
import { AgregarComponent } from '../Transaccion/agregar/agregar.component';
import { EditarComponent } from '../Transaccion/editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
  ],
  declarations: [
    MainComponent,
    ListarComponent,
    AgregarComponent,
    EditarComponent,
  ]
})
export class MainModule { }
