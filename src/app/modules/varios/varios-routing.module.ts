import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariosComponent } from './varios.component';

const routes: Routes = [{ path: '', component: VariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariosRoutingModule { }
