import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public autenticarServ: AuthService, private router: Router) { }

  cerrar() {
    this.autenticarServ.logout();
    this.router.navigate(['/login']);
  }


}
