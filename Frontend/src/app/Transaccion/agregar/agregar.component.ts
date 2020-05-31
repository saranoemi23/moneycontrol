import { Component, OnInit } from '@angular/core';
import { config } from '../../../config';

import axios from "axios";
import { ActivatedRoute } from '@angular/router';
const URL= config.backendURL() + "/transacciones"
const URL_categorias= config.backendURL() + "/categorias"

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  categorias = [];

  tipo='S';
  monto=0.00;
  id_categoria = 0;
  fecha= '';
  descripcion='';
  id: 0;
  

  constructor(private activatedRoute: ActivatedRoute){
   
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',id);
     this.cargarDatos(id);
     this.cargarFecha();
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

  cargarDatos(id) {
    axios.get(URL_categorias + '/get')
    .then(request => {
      this.categorias = request.data;
      console.log(this.categorias);
    })

    if (!id) return
    axios.get(URL + '/get/' + id)
    .then(request => {
      console.log(request.data);
      
      this.id = request.data[0].id;
      this.tipo = request.data[0].tipo
      this.monto=request.data[0].monto;
      this.id_categoria = request.data[0].id_categoria;
      this.fecha= request.data[0].fecha;
      this.descripcion=request.data[0].descripcion;
    })
  }

  agregarNueva() {

    let a = this.tipo;
    let b = this.monto;
    let c = this.id_categoria;
    let d = this.fecha;
    let e = this.descripcion;
    let f = this.id;

    let funcion = '';
    if (this.id) {
      funcion = '/edit/'+this.id
    } else {
      funcion = '/add'
    }

    //Llama el api y agrega los datos
    axios.post(URL + funcion, {
        tipo: a,
        monto: b,
        id_categoria: c,
        fecha: d,
        descripcion: e,
        id: f

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
