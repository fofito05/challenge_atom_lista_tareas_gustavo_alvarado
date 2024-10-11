import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TareasUsuarionI } from "src/app/models/tareasusuario.interface";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endPoint = 'https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/';

  constructor(private router: Router, private http: HttpClient) { }


  mostrarTareasUsario(usuario: any) {
    let seccion = "tasks/" + usuario;
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.get<any>(direccion);
  }


  actualizarTarea(id: any, tarea: any) {
    let seccion = "tasks/" + id;
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.put<any>(direccion, tarea);

  }

  eliminarTarea(id: any) {
    let seccion = "tasks/" + id;
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.delete<any>(direccion);

  }

  agregarTarea(tarea: any) {
    let seccion = "tasks/";
    let direccion = this.endPoint + seccion;
    //console.log(direccion);
    return this.http.post<any>(direccion, tarea);

  }

}
