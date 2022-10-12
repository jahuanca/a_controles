import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTreeModule } from 'ng-zorro-antd';
import { Actividad } from 'src/app/models/actividad';
import { Presentacion } from 'src/app/models/presentacion';
import { Usuario } from 'src/app/models/usuario';
import { Variables } from 'src/app/models/variables';
//import { ActividadService } from 'src/app/services/actividad.service';
import { PresentacionService } from 'src/app/services/presentacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss']
})
export class PresentacionComponent implements OnInit {

  data: Presentacion[];
  loading:Boolean=false;
  maxCount:number=0;
  viewLabors:boolean=false;
  labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'ID.', value: 'idpresentacion', isHtml: false, visible: true },
    { label: 'Detalle', value: 'detalle', isHtml: false, visible: true },
    //{ label: 'Sociedad', value: 'idsociedad', isHtml: false, visible: true },
    { label: 'Descripcion', value: 'codigoempresa', isHtml: false, visible: true },
   
  ];

  constructor(private presentacionService: PresentacionService, private router:Router) { }
  
  ngOnInit(): void {
  }

  buscar = (args: any): void =>{
    this.getPresentacionCount();
  }

  getPresentacionCount() {
    this.loading = true;
    this.presentacionService.getPresentacionCount()
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
    return this.presentacionService.getPresentacionByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
      .toPromise();
  }

  getInfo= (args:any) : void => {
    console.log(args);
    this.router.navigateByUrl('presentacion/labors/2');
    this.viewLabors=true;
  }

}
