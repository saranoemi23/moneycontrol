import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';
import { config } from '../../config';
import { identifierModuleUrl } from '@angular/compiler';

const URL = config.backendURL() + "/usuarios";
const URLTransacciones= config.backendURL() + "/transacciones"
const URLAlertas = config.backendURL() + "/alertas";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  entradas= 0;
  salidas= 0;
  alertas= [];
  anio: number = new Date().getFullYear();

  constructor(private router:Router) {
    console.log('MainComponent');
    this.cargarDatos();
  }

  ngOnInit() {
  }

  Entrada() {
    this.router.navigate(['/transacciones', 'entradas']);
  }
  Salida() {
    this.router.navigate(['/transacciones', 'salidas']);
  }
  Transaccion() {
    this.router.navigate(['/transacciones', 'listar']);
  }
  Categorias() {
    this.router.navigate(['/categorias', 'listar']);
  }
  Alertas() {
    this.router.navigate(['/alertas', 'listar']);
  }
  Cuentas() {
    this.router.navigate(['/cuentas', 'listar']);
  }
  // Suscripciones() {
  //   this.router.navigate(['/suscripcion', 'listar']);
  // }
  CerrarSesion() {
    axios.get(URL + '/cerrarsesion')
    .then(()=> {
      location.reload();
    })
  }

  cargarDatos() {

    axios.get(URLTransacciones + '/total', {
    })
    .then(request => {
      console.log (request.data);
      this.entradas = request.data.entradas;
      this.salidas = request.data.salidas;
    })

    axios.get(URLAlertas + '/hoy', {
    })
    .then(request => {
      console.log (request.data);
      this.alertas = request.data;
    })
  }

  marcarleido(alerta){
    axios.post(URLAlertas + '/marcarleido/' + alerta.id , {
      id:alerta.id, 
      repetir:alerta.repetir,
    })
    .then(request => {
      console.log (request.data);
      // this.alertas = request.data;
      alerta.ocultar=true
    })
  }
}