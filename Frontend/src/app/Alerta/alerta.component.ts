import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import axios from "axios";

import { config } from './../../config';

const URL= config.backendURL() + "/alertas"


@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertasComponent implements OnInit {

  titulo = 'Alertas';
  
  id=0;
  descripcion= '';
  fecha= '';
  repetir= '';
  fechaoriginal = '';
  idusuario=0;
  montosugerido=0;
  
  alertas=[];

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.alertas= request.data;
    })
  }

  editarDatos(alerta){
    this.id=alerta.id;
    this.descripcion=alerta.descripcion;
    this.fecha=alerta.fecha;
    this.repetir=alerta.repetir;
    this.fechaoriginal=alerta.fechaoriginal;
    this.idusuario=alerta.idusuario;
    this.montosugerido=alerta.montosugerido;

  }

  guardarDatos(){
    
    let id = this.id;
    let descripcion = this.descripcion;
    let fecha = this.fecha;
    let repetir = this.repetir;
    let fechaoriginal = this.fechaoriginal;
    let idusuario = this.idusuario;
    let montosugerido = this.montosugerido;
    
    if (descripcion==''){
      alert("Ingrese una descripción.")
      return
    }
    if (fecha==''){
      alert("Ingrese una fecha.")
      return
    }

    let datos = {
              id:id,
              descripcion:descripcion,
              fecha:fecha,
              repetir:repetir,
              fechaoriginal:fechaoriginal,
              idusuario:idusuario,
              montosugerido:montosugerido,
    }

    if (id) {
      axios.post(URL + "/edit/" + id, datos) 
      .then(() => this.cargarDatos())
        } else {
      axios.post(URL + "/add", datos)
      .then(() => this.cargarDatos())
    }
    this.nuevo();
    
  }

  nuevo(){
    this.id=0;
    this.descripcion='';
    this.fecha='';
    this.repetir='';
    this.fechaoriginal='';
    this.idusuario=0;
    this.montosugerido=0;
  }

  eliminar(alerta){
    var respuesta = confirm("Desea eliminar éste registro")
    var id=alerta.id;
    if (!respuesta) return;

    axios.delete(URL + "/delete/" + id) 
    .then(() => this.cargarDatos())
  }

}
