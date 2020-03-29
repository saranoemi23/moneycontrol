import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from "axios";

import { config } from './../../../config';

const URL= config.backendURL() + "/transacciones"

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  transacciones = []
  titulo = 'Transacciones';

  constructor(private router:Router) {
  }

  ngOnInit() {

    let tipo = getTipo(this.router.url);
    if (tipo == 'E') {
      this.titulo = "Entradas";
    }

    if (tipo == 'S') {
      this.titulo = "Salidas";
    }

    this.cargarDatos();

  }

  cargarDatos() {
    let tipo = getTipo(this.router.url);

    axios.get(URL + '/get', {
      params: { tipo: tipo }
    })
    .then(request => {
      this.transacciones = request.data;
    })
  }

  nueva() {
    this.router.navigate(['transacciones', 'agregar']);
  }

}

function getTipo(url) {
  if (url.indexOf('entradas') > 0) {
    return 'E';
  } else
  if (url.indexOf('salidas') > 0) {
    return 'S';
  } else {
    return '';
  }
}
