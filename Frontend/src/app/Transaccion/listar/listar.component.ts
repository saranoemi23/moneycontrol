import { Component, OnInit } from '@angular/core';
import axios from "axios";

import { config } from '../../../config';

const URL= config.backendURL() + "/transacciones"

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  transacciones = []

  constructor() { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.transacciones = request.data;
    })
  }

  
}
