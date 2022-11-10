import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getISOWeek } from 'date-fns';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
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

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private modal: NzModalService,
    private tareoQASService: TareoQASService,
    private personalTareaProcesoService: PersonalTareaProcesoService, 
    private notification: NzNotificationService,
    private mantenedorTareoService: MantenedorTareoService) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rango: [null, [Validators.required]],
      mantenedor: [null, [Validators.required]],
    });
    this.getMantenedors();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.validateForm.status == 'VALID'){
      this.buscar();
    }
  }

  getMantenedors() {
    this.mantenedorTareoService.getMantenedorTareos()
      .subscribe(res => {
        this.mantenedors = res as MantenedorTareo[];
      }, err => {

      });
  }

  buscar() {
    this.loading=true;
    this.personalTareaProcesoService.byRango(
      this.date[0],
      this.date[1],
      true
    )
      .subscribe(res => {
        this.loading=false;
        this.listOfData = res as PersonalTareaProceso[];
        console.log(res);
        this.listOfDisplayData = [...this.listOfData];
      }, err => {
        this.loading=false;
      });
  }

  date :Date[]= null;

  //changePagination= (args: any): Promise<any[]> => {
    //return this.actividadService.getPersonalEmpresasByLimitAndOffset(args.limit, args.offset * ((args.page) ? args.page : 1 -1))
    //  .toPromise();
  //}

  onChange(result: Date[]): void {
    this.date=result;
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sincronizar(){
    this.loading=true;
    this.personalTareaProcesoService.migrarContenido(this.listOfData)
      .subscribe( res => {
        this.loading=false;
        let respuestas=res as PersonalTareaProceso[];
        for (let i = 0; i < respuestas.length; i++) {
          const p = respuestas[i];
          let item=this.listOfDisplayData.findIndex((e)=>e.item == p.item);
          this.listOfDisplayData[item].Mensajesap= p.Mensajesap;
          this.listOfDisplayData[item].estadosap= p.estadosap;
        }
        this.listOfDisplayData=[...this.listOfDisplayData];
        this.listOfData=[...this.listOfDisplayData];
        this.createNotification('success', 'Sincronización realizada.');
      })
  }

  createNotification(type: string, mensaje: string): void {
    this.notification.create(
      type,
      'Resultado',
      mensaje,
    );
  }

  sincronizarByItem(item:number){
    this.loading=true;
    this.personalTareaProcesoService.migrarContenido([this.listOfDisplayData[item]])
      .subscribe( res => {
        this.loading=false;
        console.log(res);
        let p=res[0] as PersonalTareaProceso;
        this.listOfDisplayData[item].Mensajesap= p.Mensajesap;
        this.listOfDisplayData[item].estadosap= p.estadosap;
        this.listOfDisplayData=[...this.listOfDisplayData];
        this.listOfData=[...this.listOfDisplayData];
        this.createNotification(p.estadosap!='T' ? 'error' : 'success', p.Mensajesap ?? 'Sin mensaje de retorno');
      })
  }

  goSincronizarAll(){
    this.modal.info({
      nzTitle: 'ADVERTENCIA',
      nzOnCancel: ()=> {},
      nzContent: '<p>¿Desea sincronizar todos los registros presentes?</p>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Continuar',
      nzOnOk: () => this.sincronizar()
    });
  }

  goSincronizar(item:number){
    this.modal.info({
      nzTitle: 'ADVERTENCIA',
      nzOnCancel: ()=> {},
      nzContent: '<p>¿Desea sincronizar el siguiente registro?</p>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Continuar',
      nzOnOk: () => this.sincronizarByItem(item)
    });
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: PersonalTareaProceso) => item.codigoempresa.indexOf(this.searchValue) !== -1);
  }

}
