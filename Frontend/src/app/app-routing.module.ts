import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/transacciones/listar',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './Login/login.module#LoginModule',
  },
  {
    path: 'usuario',
    loadChildren: './Usuario/usuario.module#UsuarioModule',
  }
];
