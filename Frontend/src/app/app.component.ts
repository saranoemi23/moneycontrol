import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarComponent } from './Transaccion/listar/listar.component';
//import { NuevoComponent } from './Transaccion/listar/add.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoneyControlApp';

  constructor(private router:Router){}

  listar(){
    this.router.navigate(["listar"]);
 }
  Nuevo(){
    this.router.navigate(["add"]);
  }
}