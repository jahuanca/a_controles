import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) },
      { path: 'tareos', loadChildren: () => import('./../tareos-sap/tareos-sap.module').then(m => m.TareosSapModule) },
      { path: 'sincronizacion-actividad', loadChildren: () => import('./../actividades/actividades.module').then(m => m.ActividadesModule) },
      { path: 'sincronizacion-labor', loadChildren: () => import('./../labores/labores.module').then(m => m.LaboresModule) },
      { path: 'sincronizacion-subdivision', loadChildren: () => import('./../subdivisiones/subdivisiones.module').then(m => m.SubdivisionesModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
