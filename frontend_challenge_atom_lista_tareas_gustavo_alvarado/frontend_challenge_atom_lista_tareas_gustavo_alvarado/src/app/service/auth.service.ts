import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponseLoginI } from 'src/app/models/loginreponse.interface';
import { ResgistroLoginI } from 'src/app/models/loginregistro.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_flag = false;

  private endPoint = 'https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/';

  constructor(private router: Router, private http: HttpClient) { }


  loginUsario(usuario: any) {
    let seccion = "users/"+usuario;
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.get<ResponseLoginI>(direccion);
  }  

  registroUsuario(usuario:any){
    let seccion = "users/";
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.post<ResgistroLoginI>(direccion,usuario);

  }


  canActivate(): boolean {
    if (this.autenticar()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  autenticar(): boolean {
    return this.login_flag;
  }

  login() {
    this.login_flag = true;
  }

  logout() {
    this.login_flag = false;
    localStorage.removeItem('usuario');
  }
}
