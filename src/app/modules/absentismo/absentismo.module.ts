import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsentismoRoutingModule } from './absentismo-routing.module';
import { AbsentismoComponent } from './absentismo.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [AbsentismoComponent],
  imports: [
    CommonModule,
    AbsentismoRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ]
})
export class AbsentismoModule { }