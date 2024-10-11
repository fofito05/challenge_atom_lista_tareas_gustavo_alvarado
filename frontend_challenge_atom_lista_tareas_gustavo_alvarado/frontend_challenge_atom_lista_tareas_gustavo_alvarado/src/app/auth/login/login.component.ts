import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogData {
  correo_usuario: '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: any;

  constructor(public dialog: MatDialog, private activerouter: ActivatedRoute, private router: Router, public autenticarServ: AuthService) { }

  ngOnInit(): void {
    this.usuario = '';
    localStorage.clear();


  }

  login() {

    //this.router.navigate(['/carga_masiva']);

    console.log(this.usuario);

    if (this.usuario == '') {
      this.openDialog();

      return;
    }

    this.autenticarServ.loginUsario(this.usuario).subscribe({
      next: (response) => {

        if (response.id == '1') {
          this.autenticarServ.login();
          localStorage.setItem("correo_usuario", this.usuario);
          this.router.navigate(['/dashboard']);
        } else {
          this.abrirDialog(this.usuario);
        }
      },
      error: () => {
        console.log('ocurrió un error al hacer la petición');
      }


    });
    //this.autenticarServ.login()

  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogLogin);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  abrirDialog(correo_usuario: any) {
    //console.log(url);
    this.dialog.open(DialogLoginRegistro, {
      width: '300px',
      height: '200px',
      data: {
        correo_usuario: correo_usuario
      },
    });
  }

}

@Component({
  selector: 'dialog-login',
  templateUrl: 'dialog-login.html',
})

export class DialogLogin { }

@Component({
  selector: 'dialog-loginregistro',
  templateUrl: 'dialog-loginregistro.html',
})

export class DialogLoginRegistro {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public autenticarServ: AuthService, private router: Router) { }


  registrarUsuario() {
    //console.log(this.fecha_ven);

    let usuario = {
      correo_usuario: this.data.correo_usuario
    }

    this.autenticarServ.registroUsuario(usuario).subscribe({
      next: (response) => {

        this.autenticarServ.login();
        localStorage.setItem("correo_usuario", this.data.correo_usuario);
        this.router.navigate(['/dashboard']);

      },
      error: () => {
        console.log('ocurrió un error al hacer la petición.');
      }

    });

  }
}

