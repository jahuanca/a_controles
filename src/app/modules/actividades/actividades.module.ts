import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ActividadesComponent } from './actividades.component';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { ChildsComponent } from './childs/childs.component';


@NgModule({
  declarations: [ActividadesComponent, ChildsComponent],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    NgZorroAntdModule,
    TablesModule,
    CardsModule,
  ],
  exports: [ChildsComponent]
})
export class ActividadesModule { }
