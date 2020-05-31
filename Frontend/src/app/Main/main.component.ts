import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';
import { config } from '../../config';

const URL = config.backendURL() + "/usuarios";
const URLTransacciones= config.backendURL() + "/transacciones"


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  entradas= 0;
  salidas= 0;

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
  }
}