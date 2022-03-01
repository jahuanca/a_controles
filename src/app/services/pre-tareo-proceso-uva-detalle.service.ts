import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PreTareoProcesoUvaDetalle } from '../models/pre-tareo-proceso-uva-detalle';

@Injectable({
  providedIn: 'root'
})
export class PreTareoProcesoUvaDetalleService {


  readonly URL_API = `${Variables.URL_SERVER}pre_tareo_proceso_uva_detalle`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPreTareoProcesoUvaDetallesCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getPreTareoProcesoUvaDetalles() {
    return this.http.get<PreTareoProcesoUvaDetalle[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PreTareoProcesoUvaDetalle().deserialize(data)))
      );
  }

  getPreTareoProcesoUvaDetallesByMaster(id:number) {
    return this.http.get<PreTareoProcesoUvaDetalle[]>(`${this.URL_API}/master/${id}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PreTareoProcesoUvaDetalle().deserialize(data)))
      );
  }

  getPreTareoProcesoUvaDetallesByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<PreTareoProcesoUvaDetalle[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PreTareoProcesoUvaDetalle().deserialize(data)))
      );
  }

  getPreTareoProcesoUvaDetalle(id: number): Observable<PreTareoProcesoUvaDetalle> {
    return this.http.get<PreTareoProcesoUvaDetalle>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUvaDetalle().deserialize(data))
      );
  }

  postPreTareoProcesoUvaDetalle(arreglo: PreTareoProcesoUvaDetalle) {
    return this.http.post<PreTareoProcesoUvaDetalle>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUvaDetalle().deserialize(data))
      );
  }

  putPreTareoProcesoUvaDetalle(arreglo: PreTareoProcesoUvaDetalle) {
    return this.http.put<PreTareoProcesoUvaDetalle>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUvaDetalle().deserialize(data))
      );
  }

  deletePreTareoProcesoUvaDetalle(id: number) {
    return this.http.delete<PreTareoProcesoUvaDetalle>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new PreTareoProcesoUvaDetalle().deserialize(data))
      );
  }
}
