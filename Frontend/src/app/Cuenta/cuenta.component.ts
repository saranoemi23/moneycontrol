import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import axios from "axios";

import { config } from './../../config';

const URL= config.backendURL() + "/cuentas"


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentasComponent implements OnInit {

  titulo = 'Cuentas';

  id=0;
  nombre= '';
  tipocuenta= '';
  saldoinicial= 0;
  idusuario=0;
  
  cuentas=[];
  principal: any;

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.cuentas= request.data;
    })
  }

  editarDatos(cuenta){
    this.id=cuenta.id;
    this.nombre=cuenta.nombre;
    this.tipocuenta=cuenta.tipocuenta;
    this.saldoinicial=cuenta.saldoinicial;
    this.idusuario=cuenta.idusuario;
  }

  guardarDatos(){
    
    let id = this.id;
    let nombre = this.nombre;
    let tipocuenta = this.tipocuenta;
    let saldoinicial = this.saldoinicial;
    let idusuario = this.idusuario;
    let principal = this.principal;
    
    //! Detecta cadena vacia o numero null, o si una variable es falsa
    if (!nombre){
      alert("Ingrese un nombre de cuenta.")
      return
    }
    if (!tipocuenta){
      alert("Ingrese un tipo de cuenta.")
      return
    }
    if (!saldoinicial){
      alert("Ingrese un saldo.")
      return
    }

    let datos = {
              id:id,
              nombre:nombre,
              tipocuenta:tipocuenta,
              saldoinicial:saldoinicial,
              idusuario:idusuario,
              principal:principal,
    }
    this.enviarDatos(datos)
  }

  enviarDatos(datos){
    if (datos.id) {
      axios.post(URL + "/edit/" + datos.id, datos) 
      .then(() => this.cargarDatos())
        } else {
      axios.post(URL + "/add", datos)
      .then(() => this.cargarDatos())
    }
    this.nuevo();
  }

  nuevo(){
    this.id=0;
    this.nombre= '';
    this.tipocuenta= '';
    this.saldoinicial= 0;
    this.idusuario=0;
    this.principal=0;
    
  }

  eliminar(cuenta){
    var respuesta = confirm("Desea eliminar éste registro")
    var id=cuenta.id;
    if (!respuesta) return;

    axios.delete(URL + "/delete/" + id) 
    .then(() => this.cargarDatos())
  }

  marcarPrincipal(cuenta){
     
    let anterior = this.cuentas.find(c => c.principal == 1);

    if (anterior) {
      anterior.principal=0;
      this.enviarDatos(anterior)
    }
    cuenta.principal=1;
    this.enviarDatos(cuenta)
  }

}
