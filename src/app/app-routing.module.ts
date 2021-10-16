import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'actividades', loadChildren: () => import('./modules/actividades/actividades.module').then(m => m.ActividadesModule) },
  { path: 'labores', loadChildren: () => import('./modules/labores/labores.module').then(m => m.LaboresModule) },
  { path: 'subdivisiones', loadChildren: () => import('./modules/subdivisiones/subdivisiones.module').then(m => m.SubdivisionesModule) },
  /* { path: 'tareos-sap', loadChildren: () => import('./modules/tareos-sap/tareos-sap.module').then(m => m.TareosSapModule) }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
