import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { getISOWeek } from 'date-fns';
import { NzModalService, NzNotificationService, NzThSelectionComponent } from 'ng-zorro-antd';
import { MantenedorTareo } from 'src/app/models/mantenedor-tareo';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { ExcelService } from 'src/app/services/excel.service';
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

  downloadJsonHref;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  seleccionados: PersonalTareaProceso[]=[];
  estados: {id: number, detalle: string}[]=[
    {id: 1, detalle: 'Migrado'},
    {id: 2, detalle: 'Error'},
    {id: 3, detalle: 'Sin migrar'},
  ];
  fechasBuscadas:string='';

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder, 
    private modal: NzModalService,
    private tareoQASService: TareoQASService,
    private excelService:ExcelService,
    private personalTareaProcesoService: PersonalTareaProcesoService, 
    private notification: NzNotificationService,
    private mantenedorTareoService: MantenedorTareoService) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rango: [null, [Validators.required]],
      mantenedor: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
    this.getMantenedors();
  }


  refreshStatus(data:PersonalTareaProceso): void {
    if(data){
      let index=this.seleccionados.findIndex((e)=> e.item==data.item);
      if(index==-1){
        this.seleccionados.push(data);
      }else{
        this.seleccionados.splice(index,1)
      }
    }

    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.item]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.item]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.item] = value));
    this.seleccionados=[];
    if(value){
      this.seleccionados=[...this.listOfDisplayData];
    }
    this.refreshStatus(null);
  }

  exportarExcel(){
    let arregloExcel= [...this.listOfDisplayData];
    this.excelService.exportAsExcelFile(arregloExcel, 'registros_'+Date.now, ['pipe', 'TareaProceso', 'item']);
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

  estado:number=0;
  mantenedor:number;

  buscar() {
    console.log(this.date[0],
      this.date[1],
      this.mantenedor,
      this.estado,)
    this.loading=true;
    this.label='tareo_sap_'+Date.now();
    this.personalTareaProcesoService.byRango(
      this.date[0],
      this.date[1],
      this.mantenedor,
      this.estado,
    )
      .subscribe(res => {

        this.loading=false;
        this.listOfData = res as PersonalTareaProceso[];
        this.fechasBuscadas=`${this.listOfData.length} resultados encontrados.`;
        console.log(res);
        this.listOfDisplayData = [...this.listOfData];
      }, err => {
        this.loading=false;
      });
  }

  label:String='';

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.listOfData);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  date :Date[]= null;

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
    if(this.seleccionados==null || this.seleccionados.length==0){
      this.createNotification('error', 'Seleccione algún registro.');
      return;
    }
    this.loading=true;
    this.personalTareaProcesoService.migrarContenido(this.seleccionados)
      .subscribe( res => {
        this.loading=false;
        let respuestas=res as PersonalTareaProceso[];
        for (let i = 0; i < respuestas.length; i++) {
          const p = respuestas[i];
          let index=this.listOfDisplayData.findIndex((e)=>e.item == p.item);
          this.listOfDisplayData[index].Mensajesap= p.Mensajesap;
          this.listOfDisplayData[index].estadosap= p.estadosap;
        }
        this.listOfDisplayData=[...this.listOfDisplayData];
        this.listOfData=[...this.listOfDisplayData];
        this.seleccionados=[];
        this.checkAll(false);
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