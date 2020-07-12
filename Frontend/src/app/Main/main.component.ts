import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';
import { config } from '../../config';

const URL = config.backendURL() + "/usuarios";
const URLTransacciones= config.backendURL() + "/transacciones"
const URLAlertas = config.backendURL() + "/alertas";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  entradas = 0;
  salidas = 0;
  alertas = [];
  anio: number = new Date().getFullYear();
  montosugerido = 0;

  constructor(private router:Router) {
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
      this.entradas = request.data.entradas;
      this.salidas = request.data.salidas;
      this.montosugerido = request.data.montosugerido;
    })

    axios.get(URLAlertas + '/hoy', {
    })
    .then(request => {
      this.alertas = request.data;
    })
  }

  marcarleido(alerta){
    axios.post(URLAlertas + '/marcarleido/' + alerta.id , {
      id:alerta.id,
      repetir:alerta.repetir,
    })
    .then(request => {
      alerta.ocultar = true;
    })
  }
}