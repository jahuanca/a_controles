import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentacionRoutingModule } from './presentacion-routing.module';
import { PresentacionComponent } from './presentacion.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [PresentacionComponent],
  imports: [
    CommonModule,
    PresentacionRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ]
})
export class PresentacionModule { }