import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from '../Transaccion/listar/listar.component';
import { AgregarComponent } from '../Transaccion/agregar/agregar.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'transacciones',
    component: MainComponent,
    children: [
      { path: 'listar', component: ListarComponent},
      { path: 'agregar', component: AgregarComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
