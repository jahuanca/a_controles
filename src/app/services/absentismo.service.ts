import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Absentismo } from '../models/absentismo';

@Injectable({
  providedIn: 'root'
})
export class AbsentismoService {


  readonly URL_API = `${Variables.URL_SERVER}absentismo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getAbsentismoCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getAbsentismos() {
    return this.http.get<Absentismo[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Absentismo().deserialize(data)))
      );
  }

  getAbsentismoByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Absentismo[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Absentismo().deserialize(data)))
      );
  }

  getAbsentismo(id: number): Observable<Absentismo> {
    return this.http.get<Absentismo>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Absentismo().deserialize(data))
      );
  }

  postAbsentismo(arreglo: Absentismo) {
    return this.http.post<Absentismo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Absentismo().deserialize(data))
      );
  }

  putAbsentismo(arreglo: Absentismo) {
    return this.http.put<Absentismo>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Absentismo().deserialize(data))
      );
  }

  deleteAbsentismo(id: number) {
    return this.http.delete<Absentismo>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new Absentismo().deserialize(data))
      );
  }
}
