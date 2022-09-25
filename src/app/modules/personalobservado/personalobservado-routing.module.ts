import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalObservadoComponent  } from './personalobservado.component';

const routes: Routes = [{ path: '', component: PersonalObservadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalObservadoRoutingModule { }
