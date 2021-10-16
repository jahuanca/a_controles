import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NzFormModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
    
  ]
})
export class LoginModule {}
