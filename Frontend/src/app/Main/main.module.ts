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
import { CategoriasComponent } from '../Categoria/categoria.component';
import { AlertasComponent } from '../Alerta/alerta.component';
import { CuentasComponent } from '../Cuenta/cuenta.component';


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
    CategoriasComponent,
    AlertasComponent,
    CuentasComponent,
  ]
})
export class MainModule { }
