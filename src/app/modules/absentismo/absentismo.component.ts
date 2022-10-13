import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTreeModule } from 'ng-zorro-antd';
import { Actividad } from 'src/app/models/actividad';
import { Absentismo } from 'src/app/models/absentismo';
import { Usuario } from 'src/app/models/usuario';
import { Variables } from 'src/app/models/variables';
import { ExcelService } from 'src/app/services/excel.service';
//import { ActividadService } from 'src/app/services/actividad.service';
import { AbsentismoService } from 'src/app/services/absentismo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-absentismo',
  templateUrl: './absentismo.component.html',
  styleUrls: ['./absentismo.component.scss']
})
export class AbsentismoComponent implements OnInit {

  data: Absentismo[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
 /* labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'CodigoSAP.', value: 'codigosap', isHtml: false, visible: true },
    { label: 'Detalle', value: 'nombrecompleto', isHtml: false, visible: true },
    { label: 'Codigo', value: 'codigo', isHtml: false, visible: true },
    { label: 'Absentismo', value: 'descripcion', isHtml: false, visible: true },
    { label: 'FechaInicio', value: 'fechainicio', isHtml: false, visible: true },
    { label: 'FechaFin', value: 'fechafin', isHtml: false, visible: true }
  ];*/

  constructor(private absentismoService: AbsentismoService,private excelService:ExcelService, private router:Router) { }
  
  ngOnInit(): void {
  }

  buscar(){
    this.getAbsentismoCount();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, 'registros_'+this.maxCount);
  }

  getAbsentismoCount() {
    this.loading = true;
    this.absentismoService.getAbsentismoCount()
      .subscribe(
        async res => {
          let [err, data]= await Variables.get(this.changePagination({page: 1, limit:10, offset: 0}));
          if(err){
            console.log(err);
          }else{
            this.data=[...data];
          }
          this.maxCount = res as number;
        }
      );
  }

  changePagination= (args: any): Promise<any[]> => {
    return this.absentismoService.getAbsentismoByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('absentismo/labors/2');
    this.viewLabors=true;
  }

}
