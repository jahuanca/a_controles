import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariosRoutingModule } from './varios-routing.module';
import { VariosComponent } from './varios.component';


@NgModule({
  declarations: [VariosComponent],
  imports: [
    CommonModule,
    VariosRoutingModule
  ]
})
export class VariosModule { }
