import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
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
  labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'id', value: 'idactividad', isHtml: false, visible: false },
    { label: 'Codigo', value: 'actividad', isHtml: false, visible: true },
    { label: 'Nombre', value: 'descripcion', isHtml: false, visible: true },
    { label: 'Tipo', value: 'rendimiento', isHtml: false, visible: true },
    { label: 'Labores', value: 'cantidadLabors', isHtml: true, visible: true },
  ];

  constructor(private actividadService: ActividadService, private router:Router) { }
  
  ngOnInit(): void {
    /* this.sapService.getAbsentismo()
      .subscribe( res => {
        console.log(res);
      }, err=> {
        console.log('ERROR:');
        console.log(err);
      }) */
  }

  buscar = (args: any): void =>{
    this.getActividadsCount();
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
