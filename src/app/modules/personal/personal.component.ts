import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { PersonalEmpresa } from 'src/app/models/personal-empresa';
import { ExcelService } from 'src/app/services/excel.service';
import { Usuario } from 'src/app/models/usuario';
import { Variables } from 'src/app/models/variables';
import { ActividadService } from 'src/app/services/actividad.service';
import { PersonalEmpresaService } from 'src/app/services/personal-empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  data: PersonalEmpresa[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
  labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'Codigo E.', value: 'codigoempresa', isHtml: false, visible: true },
    { label: 'Nombres y Apellidos', value: 'nombreCompleto', isHtml: false, visible: true },
    { label: 'Fecha Ingreso', value: 'fechaingreso', isHtml: false, visible: true },
    { label: 'Fecha Cese', value: 'fechacese', isHtml: false, visible: true },
    { label: 'Documento', value: 'nrodocumento', isHtml: false, visible: true },
    { label: 'Area Nomina', value: 'areanomina', isHtml: false, visible: true },
    { label: 'Posicion', value: 'posicion', isHtml: false, visible: true },
    { label: 'Cargo', value: 'cargo', isHtml: false, visible: true },
    
    { label: 'Grupo Personal', value: 'itemgrupopersonal', isHtml: false, visible: true },

    
  ];

  constructor(private personalempresaService: PersonalEmpresaService, private router:Router) { }
  
  ngOnInit(): void {
  }

  buscar = (args: any): void =>{
    this.getPersonalEmpresaCount();
  }

  //exportarExcel(){
  //  this.excelService.exportAsExcelFile(this.listOfData, 'registros_'+this.subdivisionSelected);
  //}

  getPersonalEmpresaCount() {
    this.loading = true;
    this.personalempresaService.getPersonalEmpresasCount()
      .subscribe(
        async res => {
          let [err, data]= await Variables.get(this.changePagination({page: 1, limit:100, offset: 0}));
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
    return this.personalempresaService.getPersonalEmpresasByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('actividades-y-labores/labors/2');
    this.viewLabors=true;
  }

}
