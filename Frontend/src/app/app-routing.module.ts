import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './Transaccion/listar/listar.component';
import { AgregarComponent } from './Transaccion/agregar/agregar.component';

const routes: Routes = [
{path:'', component: ListarComponent},
{path: 'agregar', component: AgregarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
