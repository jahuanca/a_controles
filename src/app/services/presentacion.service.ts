import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Presentacion } from '../models/presentacion';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {


  readonly URL_API = `${Variables.URL_SERVER}presentacion_linea`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPresentacionCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getPresentaciones() {
    return this.http.get<Presentacion[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Presentacion().deserialize(data)))
      );
  }

  getPresentacion(id: number): Observable<Presentacion> {
    return this.http.get<Presentacion>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Presentacion().deserialize(data))
      );
  }

  postPresentacion(arreglo: number[]) {
    return this.http.post<Presentacion[]>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Presentacion().deserialize(data)))
      );
  }


  getPresentacionByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Presentacion[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Presentacion().deserialize(data)))
      );
  }

  putPresentacion(arreglo: number[]) {
    return this.http.put<Presentacion[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Presentacion().deserialize(data)))
      );
  }

  deletePresentacion(id: number) {
    return this.http.delete<Presentacion[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Presentacion().deserialize(data)))
      );
  }
}
