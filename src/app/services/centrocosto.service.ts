import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { CentroCosto } from '../models/centrocosto';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {


  readonly URL_API = `${Variables.URL_SERVER}centro_costo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getCentroCostoCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getCentroCosto() {
    return this.http.get<CentroCosto[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new CentroCosto().deserialize(data)))
      );
  }

  getCentroCostoByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<CentroCosto[]>(`${this.URL_API}/range?limit=${limit}&offset=${offset}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new CentroCosto().deserialize(data)))
      );
  }

  getCentroCosto1(id: number): Observable<CentroCosto> {
    return this.http.get<CentroCosto>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new CentroCosto().deserialize(data))
      );
  }

  postCentroCosto(arreglo: CentroCosto) {
    return this.http.post<CentroCosto>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new CentroCosto().deserialize(data))
      );
  }

  putCentroCosto(arreglo: CentroCosto) {
    return this.http.put<CentroCosto>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new CentroCosto().deserialize(data))
      );
  }

  deleteCentroCosto(id: number) {
    return this.http.delete<CentroCosto>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new CentroCosto().deserialize(data))
      );
  }
}
