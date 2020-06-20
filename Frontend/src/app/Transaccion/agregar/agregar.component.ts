import { Component, OnInit } from '@angular/core';
import { config } from '../../../config';

import axios from "axios";
import { ActivatedRoute } from '@angular/router';
const URL= config.backendURL() + "/transacciones"
const URL_categorias= config.backendURL() + "/categorias"
const URL_cuentas = config.backendURL() + "/cuentas"

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  categorias = [];
  cuentas=[];

  tipo='S';
  monto=0.00;
  id_categoria = 0;
  fecha= '';
  descripcion='';
  id: 0;
  id_categoria_anterior = 0;
  presupuesto = Infinity;
  cuenta = '';

  constructor(private activatedRoute: ActivatedRoute){
    console.log(this.activatedRoute.snapshot.paramMap);
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
    if (this.esEntrada()) {
      this.id_categoria_anterior = this.id_categoria
      this.id_categoria = 1 //Id 1 asignado para las entradas
      } else {
      if (this.id_categoria_anterior){
        this.id_categoria = this.id_categoria_anterior
      }
    }
  }

  cargarDatos(id) {
    axios.get(URL_categorias + '/get')
    .then(request => {
      this.categorias = request.data;
    })

    axios.get(URL_cuentas + '/get')
    .then(request => {
      this.cuentas = request.data;
      console.log(this.cuentas);
      this.seleccionarPrincipal();
    })

    if (!id) return
    axios.get(URL + '/get/' + id)
    .then(request => {
      console.log("transaccion",request.data);
      
      this.id = request.data[0].id;
      this.tipo = request.data[0].tipo
      this.monto=request.data[0].monto;
      this.id_categoria = request.data[0].id_categoria;
      this.fecha= request.data[0].fecha;
      this.descripcion=request.data[0].descripcion;
      this.cuenta=request.data[0].cuenta;

      this.tipoEntrada(this.tipo)
    })
  }

  seleccionarPrincipal(){
    console.log("cuenta", this.cuenta);
    if (this.cuenta) return
    console.log("cuenta", this.cuenta);
    let principal = this.cuentas.find(c => c.principal == 1);
    if (principal) {
      this.cuenta=principal.id;
    }
    console.log(principal);
  }

  agregarNueva() {
    if (!this.validar()) return 

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

  categoriasporTipo(){
    if (this.esSalida()) {
      return this.categorias.filter(c => c.id != 1); //Llamando function (c) { return c.id != 1; } // parametro => funcion retorna categorias sin id = 1
    } else {
      return this.categorias;
    }
  }

  calcularPresupuesto(){
    let id_categoria = this.id_categoria
    console.log(id_categoria);

    if (!id_categoria)return
    
    axios.get(URL_categorias + "/presupuesto/" + id_categoria)
    .then((resultado) => {
      console.log(resultado);
      let info = resultado.data[0]

      if (!info) {
        this.presupuesto = Infinity
        return
      }
      this.presupuesto = info.presupuesto - info.total
      console.log(this.presupuesto);
    })
  }

  validar(){
    let presupuesto = this.presupuesto
    let monto = this.monto

    if (monto > presupuesto) {
      alert("Excede el presupuesto.")
      return false
    }

    if (!this.id_categoria){
      alert("Seleccione una categoría.") 
      return false
    } 
    return true    
  }

  presupuestoValido(){
    return Number.isFinite(this.presupuesto)
  }
}

function formatNum(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}
