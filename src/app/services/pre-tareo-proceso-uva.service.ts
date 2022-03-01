import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PreTareoProcesoUva } from '../models/pre-tareo-proceso-uva';
import { PreTareoProcesoUvaDetalle } from '../models/pre-tareo-proceso-uva-detalle';

@Injectable({
  providedIn: 'root'
})
export class PreTareoProcesoUvaService {


  readonly URL_API = `${Variables.URL_SERVER}pre_tareo_proceso_uva`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPreTareoProcesoUvas() {
    return this.http.get<PreTareoProcesoUva[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PreTareoProcesoUva().deserialize(data)))
      );
  }

  getPreTareoProcesoUva(id: number): Observable<PreTareoProcesoUva> {
    return this.http.get<PreTareoProcesoUva>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUva().deserialize(data))
      );
  }

  postPreTareoProcesoUva(arreglo: PreTareoProcesoUva) {
    return this.http.post<PreTareoProcesoUva>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUva().deserialize(data))
      );
  }

  putPreTareoProcesoUva(arreglo: PreTareoProcesoUva) {
    return this.http.put<PreTareoProcesoUva>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUva().deserialize(data))
      );
  }

  deletePreTareoProcesoUva(id: number) {
    return this.http.delete<PreTareoProcesoUva>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUva().deserialize(data))
      );
  }

  byRango(rango: any): Observable<PreTareoProcesoUva[]> {
    return this.http.post<PreTareoProcesoUva[]>(`${this.URL_API}/rango`, rango, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PreTareoProcesoUva().deserialize(data)))
      );
  }
}
