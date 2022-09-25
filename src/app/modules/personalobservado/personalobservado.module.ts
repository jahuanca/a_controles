import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalObservadoRoutingModule } from './personalobservado-routing.module';
import { PersonalObservadoComponent } from './personalobservado.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [PersonalObservadoComponent],
  imports: [
    CommonModule,
    PersonalObservadoRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ]
})
export class PersonalObservadoModule { }