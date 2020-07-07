import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import axios from "axios";

import { config } from '../../config';
const URL = config.backendURL() + "/usuarios";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['../Login/login.component.css']
})
export class UsuarioComponent {
  user = '';
  pass = '';
  url = URL + '/login';
  redirect = config.frontendURL();
  infoPago = false;

  username = ''
  password = ''
  nombre = ''
  confirmarpass = ''

  constructor(private router:Router) {
    console.log('UsuarioComponent');
  }

  guardarRegistro(){
    let username = this.username;
    let password = this.password;
    let nombre = this.nombre;

    let datos = {
              username:username,
              password:password,
              nombre:nombre,
    }
     axios.post(URL + "/add", datos)
     this.nuevo()
     alert("Se registró usuario correctamente")
  }

  nuevo(){
    this.username = '';
    this.password = '';
    this.nombre = '';
    this.confirmarpass = '';
  }
}