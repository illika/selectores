import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private paisesService: PaisesService) { }

  miFormulario: FormGroup = this.fb.group({
    region: ["", [Validators.required]],
    pais: ["", [Validators.required]],
    frontera: ["", [Validators.required]]
  });

  regiones: string[] = [];
  paises: Pais[] = [];
  //fronteras: string[] = [];
  fronteras: Pais[] = [];

  cargando: boolean = false;

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.miFormulario.get("region")?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get("pais")?.reset("");
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.paisesByRegion(region))
      ).subscribe({
        next: (paises) => {
          this.paises = paises;
          this.cargando = false;
        },
        error: (_) => console.log("Region no valida")
      });

    this.miFormulario.get("pais")?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get("frontera")?.reset("");
          this.cargando = true;
          //delay(3000);
        }),
        switchMap((codigo) => this.paisesService.paisesByCodigo(codigo)),
        switchMap((pais) => this.paisesService.getPaisPorCodigos(pais!))
      )
      .subscribe((paises) => {
        //if (pais != null) {
          //this.fronteras = pais[0].borders;
          this.fronteras = paises;
          this.cargando = false;
        //}
      });

    /*  
    .subscribe(
        (region) => {
          if (region === "") return;
          this.paisesService.paisesByRegion(region)
            .subscribe((pais) => this.paises = pais);
        },
      );
    */
  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
