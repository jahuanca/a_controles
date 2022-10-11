import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PersonalObservado } from '../models/personalobservado';

@Injectable({
  providedIn: 'root'
})
export class PersonalObservadoService {


  readonly URL_API = `${Variables.URL_SERVER}personal_observado`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPersonalObservadoCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getPersonalObservado() {
    return this.http.get<PersonalObservado[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalObservado().deserialize(data)))
      );
  }

  getPersonalObservadoByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<PersonalObservado[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalObservado().deserialize(data)))
      );
  }

  getPersonalObservado1(id: number): Observable<PersonalObservado> {
    return this.http.get<PersonalObservado>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new PersonalObservado().deserialize(data))
      );
  }

  postPersonalObservado(arreglo: PersonalObservado) {
    return this.http.post<PersonalObservado>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalObservado().deserialize(data))
      );
  }

  putPersonalObservado(arreglo: PersonalObservado) {
    return this.http.put<PersonalObservado>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalObservado().deserialize(data))
      );
  }

  deletePersonalObservado(id: number) {
    return this.http.delete<PersonalObservado>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new PersonalObservado().deserialize(data))
      );
  }
}
