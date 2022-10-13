import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { ExcelService } from 'src/app/services/excel.service';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { Variables } from 'src/app/models/variables';
import { ActividadService } from 'src/app/services/actividad.service';
import { SAPService } from 'src/app/services/sap.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  data: Actividad[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
  /*labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'idlabor', value: 'idlabor', isHtml: false, visible: false },
    { label: 'CodigoLabor', value: 'codigolabor', isHtml: false, visible: true },
    { label: 'Labor', value: 'labor', isHtml: false, visible: true },
    { label: 'idactividad', value: 'idactividad', isHtml: false, visible: false },
    { label: 'CodigoActividad', value: 'codigoactividad', isHtml: false, visible: true },
    { label: 'Actividad', value: 'actividad', isHtml: false, visible: true },
    { label: 'TipoLabor', value: 'tipolabor', isHtml: false, visible: true },
    { label: 'Sociedad', value: 'sociedad', isHtml: false, visible: true },
    { label: 'Estado', value: 'estado', isHtml: false, visible: true },
  ];*/

  constructor(private actividadService: ActividadService,private excelService:ExcelService, private router:Router) { }
  
  ngOnInit(): void {
    /* this.sapService.getAbsentismo()
      .subscribe( res => {
        console.log(res);
      }, err=> {
        console.log('ERROR:');
        console.log(err);
      }) */
  }

  buscar(){
    this.getActividadsCount();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, 'registros_'+this.maxCount);
  }

  getActividadsCount() {
    this.loading = true;
    this.actividadService.getActividadsCount()
      .subscribe(
        async res => {
          this.maxCount = res as number;
          let [err, data]= await Variables.get(this.changePagination({page: 1, limit:10, offset: 0}));
          if(err){
            console.log(err);
          }else{
            this.data=[...data];
          }
        }
      );
  }

  changePagination= (args: any): Promise<any[]> => {
    return this.actividadService.getActividadsByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('actividades-y-labores/labors/2');
    this.viewLabors=true;
  }
  
}
