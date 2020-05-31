import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './Login/login.module#LoginModule' },
  { path: 'transacciones', loadChildren: './Main/main.module#MainModule' },
  { path: 'categorias', loadChildren: './Main/main.module#MainModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }