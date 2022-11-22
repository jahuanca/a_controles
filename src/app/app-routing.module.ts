import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tareos' },
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardGuard] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule), canActivate: [UnAuthGuard] },
  { path: 'actividades', loadChildren: () => import('./modules/actividades/actividades.module').then(m => m.ActividadesModule) },
  { path: 'labores', loadChildren: () => import('./modules/labores/labores.module').then(m => m.LaboresModule) },
  { path: 'subdivisiones', loadChildren: () => import('./modules/subdivisiones/subdivisiones.module').then(m => m.SubdivisionesModule) },
  { path: 'packing', loadChildren: () => import('./modules/packing/packing.module').then(m => m.PackingModule) },
  { path: 'varios', loadChildren: () => import('./modules/varios/varios.module').then(m => m.VariosModule) },
  { path: 'seleccion', loadChildren: () => import('./modules/seleccion/seleccion.module').then(m => m.SeleccionModule) },
  { path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'personal', loadChildren: () => import('./modules/personal/personal.module').then(m => m.PersonalModule) },
  { path: 'centrocosto', loadChildren: () => import('./modules/centrocosto/centrocosto.module').then(m => m.CentroCostoModule) },
  /* { path: 'tareos-sap', loadChildren: () => import('./modules/tareos-sap/tareos-sap.module').then(m => m.TareosSapModule) }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
