import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TareasI } from "src/app/models/tareas.interface";
import { DialogtareaComponent } from '../dialogtarea/dialogtarea.component';
import { TareaI } from 'src/app/models/tareaagregar.interface';
import { DiauptareaComponent } from '../diauptarea/diauptarea.component';

export interface DialogData {
  titulo_tarea: '';
  descripcion_tarea: '';
}

export interface DialogDataUsuario {
  usuario_tarea: '';
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario: any;

  displayedColumns: string[] | undefined;
  dataSource: any;
  //tareasUsuario: TareasI[] | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private activerouter: ActivatedRoute, private router: Router, public api: ApiService, public autenticarServ: AuthService) { }

  ngOnInit(): void {
    this.dataSource = "";
    this.usuario = localStorage.getItem("correo_usuario");
    this.displayedColumns = ['Título', 'Descripción', 'Fecha Creación', 'Estado Completado', 'Actualizar', 'Eliminar'];

    this.mostrarTareas();

  }

  eliminarTarea(id: any) {
    if (this.usuario == '') {
      this.autenticarServ.logout();
      return;
    }

    this.api.eliminarTarea(id).subscribe({

      next: (response) => {

        this.openEliminarDialog();
        this.mostrarTareas();

      },
      error: () => {
        this.openDialogError();
      }


    });

  }

  actualizarTarea(estado: boolean, titulo: any, descripcion: any, id: any, tipo_operacion: any) {
    if (this.usuario == '') {
      this.autenticarServ.logout();
      return;
    }

    if (tipo_operacion === 1) {

      if (estado == true) {
        estado = false;
      } else if (estado == false) {
        estado = true;
      }
    }


    let tarea = {
      usuario_tarea: "",
      titulo_tarea: titulo,
      fecha_creacion_tarea: "",
      estado_completado_tarea: estado,
      descripcion_tarea: descripcion,
      id: ""
    }

    //console.log(tarea);

    this.api.actualizarTarea(id, tarea).subscribe({

      next: (response) => {
        //console.log(response);
        const tareasUsuario: TareasI[] = response.data;

        //console.log(tareasUsuario);

        this.openDialog();
        this.mostrarTareas();

      },
      error: () => {
        this.openDialogError();
      }


    });

  }

  mostrarTareas() {

    if (this.usuario == '') {
      this.autenticarServ.logout();
      return;
    }

    this.api.mostrarTareasUsario(this.usuario).subscribe({
      next: (response) => {

        if (response.id == '1') {
          const tareasUsuario: TareasI[] = response.data;

          console.log(response.data);
          this.dataSource = new MatTableDataSource(tareasUsuario);
          this.dataSource.paginator = this.paginator;

        } else {
          //this.abrirDialog(this.usuario);
        }
      },
      error: () => {
        console.log('ocurrió un error al hacer la petición');
      }


    });

  }

  agregarTarea(tarea: TareaI) {

    console.log(tarea);
    let tarea_req = {
      usuario_tarea: tarea.usuario_tarea,
      titulo_tarea: tarea.titulo_tarea,
      estado_completado_tarea: tarea.estado_completado_tarea,
      descripcion_tarea: tarea.descripcion_tarea,
    }

    //console.log(tarea);

    this.api.agregarTarea(tarea_req).subscribe({

      next: (response) => {
        //console.log(response);
        //const tareasUsuario: TareasI[] = response.data;

        //console.log(tareasUsuario);
        //console.log(response);

        this.openDialogAgregarTarea();
        this.mostrarTareas();
      },
      error: () => {

      }


    });

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialog() {
    console.log("entre aqui");
    const dialogo1 = this.dialog.open(DialogtareaComponent, {
      width: '400px',
      height: '300px',
      data: {
        usuario_tarea: this.usuario,
        titulo_tarea: '',
        descripcion_tarea: '',
        estado_completado_tarea: false
      },
    });

    dialogo1.afterClosed().subscribe(tarea => {
      if (tarea != undefined)
        this.agregarTarea(tarea);
    });

  }

  abrirActualizarDialog(titulo: any, descripcion: any, estado: boolean, id: any) {
    //console.log("entre aqui");
    const dialogo1 = this.dialog.open(DiauptareaComponent, {
      width: '400px',
      height: '300px',
      data: {
        titulo_tarea: titulo,
        descripcion_tarea: descripcion,
        estado_completado_tarea: estado,
        id: id
      },
    });

    dialogo1.afterClosed().subscribe(tarea => {
      if (tarea != undefined)
        this.actualizarTarea(tarea.estado_completado_tarea, tarea.titulo_tarea, tarea.descripcion_tarea, tarea.id, 0);
    });

  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogActualizarEstadoTarea);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }


  openEliminarDialog() {

    const dialogRef = this.dialog.open(DialogEliminarTarea);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  openDialogError() {

    const dialogRef = this.dialog.open(DialogActualizarError);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  openDialogAgregarTarea() {

    const dialogRef = this.dialog.open(DialogCorrectoAgregarTarea);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }


}


@Component({
  selector: 'dialog-actestarea',
  templateUrl: 'dialog-actestarea.html',
})

export class DialogActualizarEstadoTarea { }


@Component({
  selector: 'dialog-actualizarerror',
  templateUrl: 'dialog-actualizarerror.html',
})

export class DialogActualizarError { }

@Component({
  selector: 'dialog-okaddtarea',
  templateUrl: 'dialog-okaddtarea.html',
})

export class DialogCorrectoAgregarTarea { }

@Component({
  selector: 'dialog-eliminartarea',
  templateUrl: 'dialog-eliminartarea.html',
})

export class DialogEliminarTarea { }


