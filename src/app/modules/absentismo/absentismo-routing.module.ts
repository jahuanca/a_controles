import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbsentismoComponent } from './absentismo.component';

const routes: Routes = [{ path: '', component: AbsentismoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsentismoRoutingModule { }
