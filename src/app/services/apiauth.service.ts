import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';

const httpOption = {
  headers: new HttpHeaders(
    {
      'Contend-Type': "application/json"
    })
};

@Injectable({ providedIn: 'root' })
export class ApiauthService {
  url: string = 'https://localhost:44353/api/user/login';

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  public get usuarioData(): Usuario {
    return this.usuarioSubject.value;
  }

  constructor(private _http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario=this.usuarioSubject.asObservable();
  }

  login(login: Login): Observable<Response> {
    return this._http.post<Response>(this.url, login, httpOption)
      .pipe(
        map(result => {
          if (result.success == 1) {
            const usuario: Usuario = result.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            // cambiar la sesión al usuairo nuevo
            this.usuarioSubject.next(usuario);
          }
          return result;
        })
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    // cambiar la sesión a null, se desconectó
    this.usuarioSubject.next(null);
  }
}
