import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTreeModule } from 'ng-zorro-antd';
import { Actividad } from 'src/app/models/actividad';
import { CentroCosto } from 'src/app/models/centrocosto';
import { Usuario } from 'src/app/models/usuario';
import { Variables } from 'src/app/models/variables';
import { ExcelService } from 'src/app/services/excel.service';
//import { ActividadService } from 'src/app/services/actividad.service';
import { CentroCostoService } from 'src/app/services/centrocosto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-centrocosto',
  templateUrl: './centrocosto.component.html',
  styleUrls: ['./centrocosto.component.scss']
})
export class CentroCostoComponent implements OnInit {

  data: CentroCosto[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
  /*labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'Codigo.', value: 'codigoempresa', isHtml: false, visible: true },
    { label: 'Detalle', value: 'detallecentrocosto', isHtml: false, visible: true },
    { label: 'Activo', value: 'activo', isHtml: false, visible: true },
    { label: 'FechaInicio', value: 'fechainicio', isHtml: false, visible: true },
    { label: 'FechaFin', value: 'fechabaja', isHtml: false, visible: true },
    { label: 'Fundo', value: 'zfundo', isHtml: false, visible: true },
    { label: 'Etapa', value: 'zetapa', isHtml: false, visible: true },
    { label: 'Campo', value: 'zcampo', isHtml: false, visible: true },
    { label: 'Turno', value: 'zturno', isHtml: false, visible: true },
    { label: 'Variedad', value: 'zvaried', isHtml: false, visible: true },

  ];*/

  constructor(private centrocostoService: CentroCostoService,private excelService:ExcelService ,private router:Router) { }
  
  ngOnInit(): void {
  }

  buscar (){
    this.getCentroCostoCount();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, 'registros_'+this.maxCount);
  }

  getCentroCostoCount() {
    this.loading = true;
    this.centrocostoService.getCentroCostoCount()
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
    return this.centrocostoService.getCentroCostoByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('centrocosto/labors/2');
    this.viewLabors=true;
  }

}
