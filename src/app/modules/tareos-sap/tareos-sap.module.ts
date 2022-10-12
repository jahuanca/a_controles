import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareosSapRoutingModule } from './tareos-sap-routing.module';
import { TareosSapComponent } from './tareos-sap.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TareosSapComponent],
  imports: [
    CommonModule,
    TareosSapRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TareosSapModule { }
