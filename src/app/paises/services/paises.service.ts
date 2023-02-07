import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  private _regiones: string[] = [
    "EU", "EFTA", "CARICOM", "PA", "AU", "USAN", "EEU",
    "AL","ASEAN", "CAIS", "CEFTA","NAFTA","SAARC"
  ];

  private baseUrl : string = "https://restcountries.com/v2";

  get regiones() {
    return [...this._regiones];
  }

  paisesByRegion(region: string) : Observable<Pais[]>{
    const url = `${this.baseUrl}/regionalbloc/${region}?fields=alpha3Code,name`;
    return this.http.get<Pais[]>(url);
  }
}
