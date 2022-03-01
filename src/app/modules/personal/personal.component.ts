import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { PersonalEmpresa } from 'src/app/models/personal-empresa';
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
    { label: 'Codigo E.', value: 'codigoempresa', isHtml: false, visible: false },
    { label: 'Nombre', value: 'nombreCompleto', isHtml: false, visible: true },
    { label: 'Nombre', value: 'descripcion', isHtml: false, visible: true },
    { label: 'Tipo', value: 'rendimiento', isHtml: false, visible: true },
    { label: 'Labores', value: 'cantidadLabors', isHtml: true, visible: true },
  ];

  constructor(private actividadService: PersonalEmpresaService, private router:Router) { }
  
  ngOnInit(): void {
  }

  buscar = (args: any): void =>{
    this.getActividadsCount();
  }

  getActividadsCount() {
    this.loading = true;
    this.actividadService.getPersonalEmpresasCount()
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
    return this.actividadService.getPersonalEmpresasByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('actividades-y-labores/labors/2');
    this.viewLabors=true;
  }

}
