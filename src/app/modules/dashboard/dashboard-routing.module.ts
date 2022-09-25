import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) },
      { path: 'personal', loadChildren: () => import('./../personal/personal.module').then(m => m.PersonalModule) },
      { path: 'absentismo', loadChildren: () => import('./../absentismo/absentismo.module').then(m => m.AbsentismoModule) },
      { path: 'presentaciones', loadChildren: () => import('./../presentacion/presentacion.module').then(m => m.PresentacionModule) },
      { path: 'personal-observado', loadChildren: () => import('./../personalobservado/personalobservado.module').then(m => m.PersonalObservadoModule) },
      { path: 'usuarios', loadChildren: () => import('./../usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'centros-de-costo', loadChildren: () => import('./../centrocosto/centrocosto.module').then(m => m.CentroCostoModule) },
      { path: 'tareos', loadChildren: () => import('./../tareos-sap/tareos-sap.module').then(m => m.TareosSapModule) },
      { path: 'packing', loadChildren: () => import('./../packing/packing.module').then(m => m.PackingModule) },
      { path: 'varios', loadChildren: () => import('./../varios/varios.module').then(m => m.VariosModule) },
      { path: 'seleccion', loadChildren: () => import('./../seleccion/seleccion.module').then(m => m.SeleccionModule) },
      { path: 'actividades-y-labores', loadChildren: () => import('./../actividades/actividades.module').then(m => m.ActividadesModule), pathMatch: ''},
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
