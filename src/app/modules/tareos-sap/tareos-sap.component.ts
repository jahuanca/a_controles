import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getISOWeek } from 'date-fns';
import { MantenedorTareo } from 'src/app/models/mantenedor-tareo';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { MantenedorTareoService } from 'src/app/services/mantenedor-tareo.service';
import { PersonalTareaProcesoService } from 'src/app/services/personal-tarea-proceso.service';
import { TareoQASService } from 'src/app/services/tareo-qas.service';

class ByRango{
  fechaInicio: Date;
  fechaFin: Date;
  esRendimiento: boolean;
  esPacking: boolean;
}

@Component({
  selector: 'app-tareos-sap',
  templateUrl: './tareos-sap.component.html',
  styleUrls: ['./tareos-sap.component.scss']
})
export class TareosSapComponent implements OnInit {

  searchValue = '';
  mantenedors: MantenedorTareo[];
  visible = false;
  loading:Boolean=false;
  listOfData: PersonalTareaProceso[] = [];
  listOfDisplayData = [...this.listOfData];

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private tareoQASService: TareoQASService,
    private personalTareaProcesoService: PersonalTareaProcesoService, 
    private mantenedorTareoService: MantenedorTareoService) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rango: [null, [Validators.required]],
      mantenedor: [null, [Validators.required]],
    });
    this.getMantenedors();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.validateForm.status == 'VALID'){
      this.buscar();
    }
  }

  getMantenedors() {
    this.mantenedorTareoService.getMantenedorTareos()
      .subscribe(res => {
        this.mantenedors = res as MantenedorTareo[];
      }, err => {

      });
  }

  buscar() {
    this.loading=true;
    this.personalTareaProcesoService.byRango(
      this.date[0],
      this.date[1],
      true
    )
      .subscribe(res => {
        this.loading=false;
        this.listOfData = res as PersonalTareaProceso[];
        console.log(res.length);
        this.listOfDisplayData = [...this.listOfData];
      }, err => {
        this.loading=false;
      });
  }

  date :Date[]= null;

  onChange(result: Date[]): void {
    this.date=result;
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sincronizar(){
    this.personalTareaProcesoService.migrarContenido(this.listOfData)
      .subscribe( res => {
        console.log(res);
      })
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: PersonalTareaProceso) => item.codigoempresa.indexOf(this.searchValue) !== -1);
  }

}
