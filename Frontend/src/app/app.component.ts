import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { config } from '../config';
const URL = config.backendURL() + "/usuarios/session";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoneyControlApp';

  constructor(private router:Router){
    console.log('AppComponent');

    if (router.url == '/') {
      this.redireccionar(router);
    }

  }

  redireccionar(router) {
    this.comprobarSession()
      .then(userId => {

        let ventanaLogin = router.url.indexOf('/login') > -1;

        // si no hay usuario logueado, pero no está en el login
        if (!userId && !ventanaLogin) {
          return router.navigate(['login', 'entrar']);
        }
        // si hay un usuario logueado
        console.log('ruta', this.router.url)
         if (this.router.url == '/') {
           router.navigate(['transacciones', 'listar']);
         }
      });
  }

  comprobarSession() {
    return axios(URL, {
      method: 'get',
      withCredentials: true,
    })
    .then(request => request.data.userId)
  }
}