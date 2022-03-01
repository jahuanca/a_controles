import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingRoutingModule } from './packing-routing.module';
import { PackingComponent } from './packing.component';
import { NgZorroAntdModule, NzModalModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { TablesModule } from 'src/app/pages/tables/tables.module';


@NgModule({
  declarations: [PackingComponent],
  imports: [
    CommonModule,
    PackingRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    TablesModule,
    NzModalModule,
  ]
})
export class PackingModule { }
