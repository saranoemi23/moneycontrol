import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { config } from '../../config';
const URL = config.backendURL() + "/usuarios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  pass = '';
  url = URL + '/login';
  redirect = config.frontendURL();

  mostrarInfo = false;

  constructor(private router:Router) {
  }

}