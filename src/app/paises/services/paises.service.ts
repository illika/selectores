import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisData } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  private _regiones: string[] = [
    "EU", "EFTA", "CARICOM", "PA", "AU", "USAN", "EEU",
    "AL", "ASEAN", "CAIS", "CEFTA", "NAFTA", "SAARC"
  ];

  private baseUrl: string = "https://restcountries.com/v2";

  get regiones() {
    return [...this._regiones];
  }

  paisesByRegion(region: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/regionalbloc/${region}?fields=alpha3Code,name`;
    return this.http.get<Pais[]>(url);
  }

  paisesByAlpha(codigo: string): Observable<PaisData | null> {

    if (!codigo) return of(null)

    const url = `${this.baseUrl}/alpha?codes=${codigo}`;
    return this.http.get<PaisData>(url);
  }
}
