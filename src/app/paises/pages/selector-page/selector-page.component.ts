import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
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
    pais: ["", [Validators.required]]
  });

  regiones: string[] = [];
  paises: Pais[] = [];

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.miFormulario.get("region")?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get("pais")?.reset("");
        }),
        switchMap((region) => this.paisesService.paisesByRegion(region))
      ).subscribe({
        next: (paises) => this.paises = paises,
        error: (_) => console.log("Region no valida")
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
    console.log(this.miFormulario);
  }

}
