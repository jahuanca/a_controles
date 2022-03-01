import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cultivo } from 'src/app/models/cultivo';
import { PreTareoProcesoUva } from 'src/app/models/pre-tareo-proceso-uva';
import { PreTareoProcesoUvaDetalle } from 'src/app/models/pre-tareo-proceso-uva-detalle';
import { Variables } from 'src/app/models/variables';
import { CultivoService } from 'src/app/services/cultivo.service';
import { PreTareoProcesoUvaDetalleService } from 'src/app/services/pre-tareo-proceso-uva-detalle.service';
import { PreTareoProcesoUvaService } from 'src/app/services/pre-tareo-proceso-uva.service';

class ByRango {
  inicio: Date;
  fin: Date;
  idcultivo: number;
}

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent implements OnInit {

  searchValue = '';
  idcultivo: number = -1;
  cultivos: Cultivo[];
  isLoading: Boolean = false;
  visible = false;
  listOfData: any[] = [];
  data: PreTareoProcesoUva[] = [];
  dataSelected: PreTareoProcesoUva;
  maxCount: number = 0;
  viewDetails: boolean = false;
  dataDetails: PreTareoProcesoUvaDetalle[] = [];
  loading: Boolean = false;
  loadingDetails: boolean = false;
  labels: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'id', value: 'idactividad', isHtml: false, visible: false },
    { label: 'Codigo', value: 'itempretareaprocesouva', isHtml: false, visible: true },
    { label: 'Turno', value: 'turno', isHtml: false, visible: true },
    { label: 'Centro', value: 'centroCosto', isHtml: false, visible: true },
    { label: 'Detalles', value: 'detalles', isHtml: true, visible: true },
  ];

  labelsDetails: { label: string, value: string, isHtml: boolean, visible: boolean }[] = [
    { label: 'Codigo Empresa', value: 'codigoempresa', isHtml: false, visible: true },
    { label: 'N° Caja', value: 'numcaja', isHtml: false, visible: true },
    { label: 'Centro', value: 'centroCosto', isHtml: false, visible: true },
  ];

  constructor(private preTareoProcesoUvaService: PreTareoProcesoUvaService, private cultivoService: CultivoService, private router: Router, private preTareProcesoUvaDetalleService: PreTareoProcesoUvaDetalleService) {

  }

  ngOnInit(): void {
    this.getCultivos();
  }

  getInfo = (args: any): void => {
    this.dataSelected=args;
    this.dataDetails=[];
    this.viewDetails = true;
    this.loadingDetails = true;
    this.preTareProcesoUvaDetalleService.getPreTareoProcesoUvaDetallesByMaster(args.itempretareaprocesouva)
      .subscribe(
        res => {
          this.dataDetails = res as PreTareoProcesoUvaDetalle[];
          this.loadingDetails = false;
        },
        err => {
          this.loadingDetails = false;
        }
      );
  }

  refreshDetail(){
    this.getInfo(this.dataSelected);
  }

  getCultivos() {
    this.cultivoService.getCultivos()
      .subscribe(res => {
        this.cultivos = res as Cultivo[];
      }, err => {

      });
  }

  buscar() {
    this.isLoading = true;
    let r: ByRango = new ByRango();
    r.idcultivo = this.idcultivo;
    r.inicio = this.date[0];
    r.fin = this.date[1];
    this.preTareoProcesoUvaService.byRango(r)
      .subscribe(res => {
        this.isLoading = false;
        console.log(res);
        this.listOfData = res as PreTareoProcesoUva[];
        this.data = [...this.listOfData];
      }, err => {
        this.isLoading = false;
      });
  }

  date = null;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.data = this.listOfData.filter((item: any) => item.codigoempresa.indexOf(this.searchValue) !== -1);
  }

}
