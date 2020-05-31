import { Component, OnInit, ɵConsole } from '@angular/core';
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
  total: number;

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
      
      let con = 0;
      if (tipo != '') {
        this.transacciones.forEach(transaccion => {
          con = con + transaccion.monto;
        })
      }
      else {
        this.transacciones.forEach(transaccion => {
          // con = con + transaccion.monto ;
          if (transaccion.tipo == 'E') {
            con = con + transaccion.monto ;
          } else {
            con = con - transaccion.monto ;
          }
        })
      }
      this.total = con;
    })
  }

  nueva() {
    this.router.navigate(['transacciones', 'agregar']);
  }

  editar(id) {
    console.log("editar",id);
    this.router.navigate(['transacciones', 'editar', id]); 
  }

  eliminar(id) {
    if (confirm('Desea elimar registro?')) {
      console.log("eliminar",id);
    axios.delete(URL + '/delete/' + id).then(()=>{
      this.cargarDatos();
    })
    }
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
