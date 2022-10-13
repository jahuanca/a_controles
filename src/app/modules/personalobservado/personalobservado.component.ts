import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTreeModule } from 'ng-zorro-antd';
import { Actividad } from 'src/app/models/actividad';
import { PersonalObservado } from 'src/app/models/personalobservado';
import { ExcelService } from 'src/app/services/excel.service';
import { Usuario } from 'src/app/models/usuario';
import { Variables } from 'src/app/models/variables';
//import { ActividadService } from 'src/app/services/actividad.service';
import { PersonalObservadoService } from 'src/app/services/personalobservado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-personalobservado',
  templateUrl: './personalobservado.component.html',
  styleUrls: ['./personalobservado.component.scss']
})
export class PersonalObservadoComponent implements OnInit {

  data: PersonalObservado[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
  /*labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'DNI.', value: 'DNI', isHtml: false, visible: true },
    { label: 'Apellidos y Nombres', value: 'nombreCompleto', isHtml: false, visible: true },
    { label: 'Inicio', value: 'BEGDA', isHtml: false, visible: true },
    { label: 'Fin', value: 'ENDDA', isHtml: false, visible: true },

  ];*/

  constructor(private personalobservadoservice: PersonalObservadoService,private excelService:ExcelService , private router:Router) { }
  
  ngOnInit(): void {
  }

  //buscar = (args: any): void =>{
  buscar (){
    this.getPersonalObservadoCount();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, 'registros_'+this.maxCount);
  }
  getPersonalObservadoCount() {
    this.loading = true;
    this.personalobservadoservice.getPersonalObservadoCount()
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
    return this.personalobservadoservice.getPersonalObservadoByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('personalobservado/labors/2');
    this.viewLabors=true;
  }

}
