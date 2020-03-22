import { Component, OnInit } from '@angular/core';
import { config } from '../../../config';

import axios from "axios";
const URL= config.backendURL() + "/transacciones"
const URL_categorias= config.backendURL() + "/categorias"

console.log(URL);

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  categorias = [];

  tipo='S';
  monto=0.00;
  id_categoria = '';
  fecha= '';
  descripcion='';
  
  constructor() {

    this.cargarFecha();
    this.cargarDatos();
  }

  ngOnInit() {
  }

  cargarFecha() {
      var hoy = new Date();

      var año = hoy.getFullYear();
      var mes = formatNum(hoy.getMonth() + 1);
      var dia = formatNum(hoy.getDate());

      this.fecha = año + '-' + mes + '-' + dia;
  }

  esEntrada() {
    return this.tipo == 'E';
  }

  esSalida() {
    return this.tipo == 'S';
  }

  tipoEntrada(valor) {
    this.tipo = valor;
  }

  cargarDatos() {
    axios.get(URL_categorias + '/get')
    .then(request => {
      this.categorias = request.data;
    })
  }

  agregarNueva() {

    let a = this.tipo;
    let b = this.monto;
    let c = this.id_categoria;
    let d = this.fecha;
    let e = this.descripcion;

    //Llama el api y agrega los datos
    axios.post(URL + '/add', {
        tipo: a,
        monto: b,
        id_categoria:c,
        fecha:d,
        descripcion:e

      })

      // despues de guardar los datos
      .then(() => {
        alert('Guardado');
        location.href = '/';
      })

  }

}

function formatNum(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}
