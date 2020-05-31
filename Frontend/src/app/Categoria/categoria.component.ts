import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import axios from "axios";

import { config } from './../../config';

const URL= config.backendURL() + "/categorias"


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriasComponent implements OnInit {

  titulo = 'Categorias';
  categorias= [];
  idcategoria= 0;
  presupuesto= 0;
  descripcion = [];
  id=0;
  ca_descripcion=[];

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/getsegunusuario')
    .then(request => {
      this.categorias= request.data;
    })
  }

  editarDatos(categoria){
    this.idcategoria=categoria.ca_id;
    this.presupuesto=categoria.presupuesto;
    this.descripcion=categoria.descripcion;
    this.id=categoria.id;
    this.ca_descripcion=categoria.ca_descripcion;
  }

  guardarDatos(){
    
    let id = this.id;
    let idcategoria = this.idcategoria;
    let presupuesto = this.presupuesto;
    let descripcion = this.descripcion;
    
    let datos = {
              id:id,
              idcategoria:idcategoria,
              presupuesto:presupuesto,
              descripcion:descripcion,
    }

    if (id) {
      axios.post(URL + "/edit/" + id, datos) 
      .then(() => this.cargarDatos())
        } else {
      axios.post(URL + "/add", datos)
      .then(() => this.cargarDatos())
    }
    
  }
}
