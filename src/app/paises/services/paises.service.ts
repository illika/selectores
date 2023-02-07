import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor() { }

  private _regiones: string[] = [
    "EU",
    "EFTA",
    "CARICOM",
    "PA",
    "AU",
    "USAN",
    "EEU",
    "AL",
    "ASEAN",
    "CAIS",
    "CEFTA",
    "NAFTA",
    "SAARC"
  ];

  get regiones() {
    return [...this._regiones];
  }
}
