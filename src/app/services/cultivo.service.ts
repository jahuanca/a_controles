import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Cultivo } from '../models/cultivo';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {


  readonly URL_API = `${Variables.URL_SERVER}cultivo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getCultivos() {
    return this.http.get<Cultivo[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Cultivo().deserialize(data)))
      );
  }

  getCultivo(id: number): Observable<Cultivo> {
    return this.http.get<Cultivo>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Cultivo().deserialize(data))
      );
  }

  postCultivo(arreglo: Cultivo) {
    return this.http.post<Cultivo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Cultivo().deserialize(data))
      );
  }

  putCultivo(arreglo: Cultivo) {
    return this.http.put<Cultivo>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Cultivo().deserialize(data))
      );
  }

  deleteCultivo(id: number) {
    return this.http.delete<Cultivo>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new Cultivo().deserialize(data))
      );
  }
}
