import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';
import { config } from '../../config';
const URL = config.backendURL() + "/usuarios";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router:Router) {
    console.log('MainComponent');
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

  CerrarSesion() {
    axios.get(URL + '/cerrarsesion')
    .then(()=> {
      location.reload();
    })
  }
}