import { Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { PersonalTareaProcesoService } from 'src/app/services/personal-tarea-proceso.service';

@Component({
  selector: 'app-tareos-sap',
  templateUrl: './tareos-sap.component.html',
  styleUrls: ['./tareos-sap.component.scss']
})
export class TareosSapComponent implements OnInit {

  searchValue = '';
  visible = false;
  listOfData: PersonalTareaProceso[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(private personalTareaProcesoService: PersonalTareaProcesoService) {

  }

  ngOnInit(): void {
  }

  buscar(){
    this.personalTareaProcesoService.getPersonalTareaProcesos()
      .subscribe( res=> {
        this.listOfData= res as PersonalTareaProceso[];
        this.listOfDisplayData=[...this.listOfData];
      }, err => {});
  }

  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: PersonalTareaProceso) => item.codigoempresa.indexOf(this.searchValue) !== -1);
  }

}
