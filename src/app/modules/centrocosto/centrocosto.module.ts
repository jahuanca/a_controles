import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroCostoRoutingModule } from './centrocosto-routing.module';
import { CentroCostoComponent } from './centrocosto.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [CentroCostoComponent],
  imports: [
    CommonModule,
    CentroCostoRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ]
})
export class CentroCostoModule { }