import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesComponent } from './actividades.component';
import { ChildsComponent } from './childs/childs.component';

const routes: Routes = [
  { path: '**', component: ActividadesComponent,
    /* children: [
      { path: 'labors/2', component: ChildsComponent,},
    ] */
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
