import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { config } from '../../config';
const URL = config.backendURL() + "/usuarios";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['../Login/login.component.css']
})
export class UsuarioComponent {
  user = '';
  pass = '';
  url = URL + '/login';
  redirect = config.frontendURL();
  infoPago = false;

  constructor(private router:Router) {
    console.log('UsuarioComponent');
  }
}