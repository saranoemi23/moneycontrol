import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from '../Transaccion/listar/listar.component';
import { AgregarComponent } from '../Transaccion/agregar/agregar.component';
import { MainComponent } from './main.component';
import { CategoriasComponent } from '../Categoria/categoria.component';
import { AlertasComponent } from '../Alerta/alerta.component';
import { CuentasComponent } from '../Cuenta/cuenta.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {
    path: 'transacciones',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      { path: 'listar', component: ListarComponent},
      { path: 'entradas', component: ListarComponent},
      { path: 'salidas', component: ListarComponent},
      { path: 'agregar', component: AgregarComponent},
      { path: 'editar/:id', component: AgregarComponent}
    ]
  },
  {
    path: 'categorias',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      { path: 'listar', component: CategoriasComponent},
    ]
  },
  {
    path: 'alertas',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      { path: 'listar', component: AlertasComponent},
    ]
  },
  {
    path: 'cuentas',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      { path: 'listar', component: CuentasComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
