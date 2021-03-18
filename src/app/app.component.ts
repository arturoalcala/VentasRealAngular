import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ventas';
  usuario: Usuario;

  constructor(
    public apiauth: ApiauthService,
    private router: Router
  ) {
    this.apiauth.usuario.subscribe(response => {
      this.usuario = response;
      console.log('cambió el objeto: ' + response);
    });
  }

  logout() {
    this.apiauth.logout();
    this.router.navigate(['/login']);
  }
}
