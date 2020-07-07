import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';

import axios from "axios";

import { config } from './../../../config';

const URL= config.backendURL() + "/transacciones"

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']

})
export class ListarComponent implements OnInit {
  
  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  chartListo = false
  transacciones = []
  titulo = 'Transacciones';
  total: number;

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: [],
      series: [],
    };

    let tipo = getTipo(this.router.url);
    if (tipo == 'E') {
      this.titulo = "Entradas";
    }

    if (tipo == 'S') {
      this.titulo = "Salidas";
    }

    this.cargarDatos();

  }

  generarChart(transacciones){
    let sumas: { [key:string]:number; } = {};
    let total = 0;

    transacciones.forEach(element => {
      console.log(element)
      
      let valor = element.monto;
      let index = element.categoria;
      if(index=="Ingreso"){
        return
      }
      if (sumas[index]){
        sumas [index] += valor
      } 
      else {
        sumas [index] = valor
      }
      total+=valor;
    });

    console.log(sumas);
    let labels = Object.keys(sumas);
    let values = Object.values(sumas);

    labels=labels.map(function(label, n){
      let valor: number = values[n]; //
      console.log(valor, total);
      let porcentaje = Math.floor(valor/total*10000)/100;
      return label +" " + porcentaje + "%"
    });

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: labels,
      series: values,
    };
    console.log(labels);
    console.log(values);
    this.chartListo=true;
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
        this.generarChart(this.transacciones);
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


