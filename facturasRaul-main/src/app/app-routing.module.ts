import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// @ts-ignore
import {AuthGuard, ChecarLoginGuard} from './shared/guards/checar-login.guard';
import {canActivate} from '@angular/fire/auth-guard';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

// tslint:disable-next-line:max-line-length
// @ts-ignore
// tslint:disable-next-line:max-line-length
const routes: Routes = [{ path: 'escaner', loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule)}, { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
  path: '',
  canActivate: [AuthGuard],
  component: AppComponent
},
  {
    path: 'login',
    component: LoginComponent
  }];
// path: '' -> ruta base
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
