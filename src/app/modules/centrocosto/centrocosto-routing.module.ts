import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentroCostoComponent } from './centrocosto.component';

const routes: Routes = [{ path: '', component: CentroCostoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroCostoRoutingModule { }
