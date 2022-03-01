import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeleccionRoutingModule } from './seleccion-routing.module';
import { SeleccionComponent } from './seleccion.component';


@NgModule({
  declarations: [SeleccionComponent],
  imports: [
    CommonModule,
    SeleccionRoutingModule
  ]
})
export class SeleccionModule { }
