import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentacionComponent } from './presentacion.component';

const routes: Routes = [{ path: '', component: PresentacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentacionRoutingModule { }
