import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NgZorroAntdModule, NzDividerModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NzDividerModule,
    NgZorroAntdModule,
  ]
})
export class UsuariosModule { }
