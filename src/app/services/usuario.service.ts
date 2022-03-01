import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  readonly URL_API = `${Variables.URL_SERVER}usuario`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getUsuariosByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Usuario[]>(`${this.URL_API}/range&limit=${limit}&offset=${offset}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Usuario().deserialize(data)))
      );
  }

  getUsuariosCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Usuario().deserialize(data)))
      );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Usuario().deserialize(data))
      );
  }

  postUsuario(arreglo: Usuario) {
    return this.http.post<Usuario>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Usuario().deserialize(data))
      );
  }

  putUsuario(arreglo: Usuario) {
    return this.http.put<Usuario>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Usuario().deserialize(data))
      );
  }

  deleteUsuario(id: number) {
    return this.http.delete<Usuario>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new Usuario().deserialize(data))
      );
  }
}
