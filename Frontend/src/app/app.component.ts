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

        let rutaPublica = this.esrutaPublica(router);

        // si no hay usuario logueado, pero no está en el login
        if (!userId && !rutaPublica) {
          console.log(this.router.url);
          console.log("redireccionando");
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

  esrutaPublica(router){
    if (router.url.indexOf('/login') > -1){
      return true
    }
    if (router.url.indexOf('/usuario') > -1){
      return true
    }
    return false
  }
}