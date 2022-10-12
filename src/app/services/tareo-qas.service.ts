import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareoQASService {


  readonly URL_API = `https://ecs-hanaqas.agrovision.com:44300/sap/xi/zhcm_int_gmo/webhcm?sap-client=200%20HTTP/1.1`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }


  
 /*  getTareoQASs() {
    return this.http.get<TareoQAS[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new TareoQAS().deserialize(data)))
      );
  } */

  getToken(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/`, { headers: {
      'Authorization': 'Basic bnNvc2E6TmVzdG9yLjIwMjI=',
      'x-csrf-token': 'fetch',
      'Host': 'ecs-hanaqas.agrovision.com:44300',
      /* 'Cookie': 'sap-XSRF_AVQ_200=uuzj8ydIB6f6jE3nw4EHQw%3d%3d20220919054103BKq53AsiZvCWW6PhRT7_uhV8XM3ZmXX0o-QWEcAEw3A%3d; sap-usercontext=sap-client=200', */
    }, observe: 'response',
  });
    
  }

/*   postTareoQAS(arreglo: TareoQAS) {
    return this.http.post<TareoQAS>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new TareoQAS().deserialize(data))
      );
  } */

}
