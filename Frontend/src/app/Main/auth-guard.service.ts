import axios from 'axios';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { config } from '../../config';
const URL_SESSION = config.backendURL() + "/usuarios/session";


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  async canActivate(): Promise<boolean> {
    let userId = await this.comprobarSession();

    if (!userId) {
      this.router.navigateByUrl('/login/entrar');
    }
    return !!userId;
  }


  async comprobarSession() {
    let request = await axios(URL_SESSION, {
      method: 'get',
      withCredentials: true,
    })

    return request.data.userId;
  }
}