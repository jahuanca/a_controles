import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [PersonalComponent],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ]
})
export class PersonalModule { }
