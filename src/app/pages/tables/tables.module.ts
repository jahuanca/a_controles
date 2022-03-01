import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSimpleComponent } from './tabla-simple/tabla-simple.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablaOnlyComponent } from './tabla-only/tabla-only.component';
import { ActividadService } from 'src/app/services/actividad.service';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';



@NgModule({
  declarations: [TablaSimpleComponent, TablaOnlyComponent, SafeHtmlPipe],
  exports: [TablaSimpleComponent, TablaOnlyComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,  
    NgZorroAntdModule,
  ]
})
export class TablesModule { }
