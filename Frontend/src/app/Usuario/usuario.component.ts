import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import axios from "axios";

import { config } from '../../config';
const URL = config.backendURL() + "/usuarios";
const URL_SUS = config.backendURL() + "/suscripciones";

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

  tarjeta = ''
  ccv = ''
  titular = ''
  mes = ''
  ano = ''
  ciudad = '' 
  direccion = ''
  idusuario = ''

  constructor(private router:Router) {
    console.log('UsuarioComponent');
  }

  guardarUsuario(){
    let username = this.username;
    let password = this.password;
    let nombre = this.nombre;

    let datos = {
              username:username,
              password:password,
              nombre:nombre,
    }
    return axios.post(URL + "/add", datos)
  }

  nuevo(){
    this.username = '';
    this.password = '';
    this.nombre = '';
    this.confirmarpass = '';

    this.tarjeta= ''
    this.ccv = ''
    this.titular = ''
    this.mes = '' 
    this.ano = ''
    this.ciudad = ''
    this.direccion = ''
  }

  guardar(){
    this.guardarUsuario().then((res) => {
    console.log(res.data) 
    this.idusuario=res.data.id

    return this.guardarSuscripcion() 
    })
    .then((res) => {
    this.nuevo()
    alert("Se registró usuario correctamente")
    })
    .catch((error) =>{
      if (error.response.data.error == 'duplicado'){
        alert("Usuario ya existe")
      }
      console.log(error.response.data);
    })

  }

  guardarSuscripcion(){
    let tarjeta = this.tarjeta;
    let ccv = this.ccv;
    let titular = this.titular;
    let mes = this.mes;
    let ano = this.ano;
    let ciudad = this.ciudad;
    let direccion = this.direccion;
    let idusuario = this.idusuario;

    let datos = {
              tarjeta:tarjeta,
              ccv:ccv,
              titular:titular,
              mes:mes,
              ano:ano,
              ciudad:ciudad,
              direccion:direccion,
              idusuario:idusuario,
    }
    if (!this.infoPago){
      return
    }
    else {
      return axios.post(URL_SUS + "/add", datos)
    }
  }
}