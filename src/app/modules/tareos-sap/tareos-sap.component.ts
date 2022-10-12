import { Component, OnInit } from '@angular/core';
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

  constructor(
    private tareoQASService: TareoQASService,
    private personalTareaProcesoService: PersonalTareaProcesoService, 
    private mantenedorTareoService: MantenedorTareoService) {

  }

  ngOnInit(): void {
    this.getMantenedors();
  }

  getMantenedors() {
    this.mantenedorTareoService.getMantenedorTareos()
      .subscribe(res => {
        this.mantenedors = res as MantenedorTareo[];
      }, err => {

      });
  }

  buscar() {
<<<<<<< HEAD
  //   this.personalTareaProcesoService.byRango()
  //    .subscribe(res => {
  //      this.listOfData = res as PersonalTareaProceso[];
  //      this.listOfDisplayData = [...this.listOfData];
  //    }, err => { }); 
   }


=======
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
>>>>>>> b6448e0409325f6bbcb5e59ca0a68b31f2dbee64

  date :Date[]= null;

  //changePagination= (args: any): Promise<any[]> => {
    //return this.actividadService.getPersonalEmpresasByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
    //  .toPromise();
  //}

  onChange(result: Date[]): void {
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
