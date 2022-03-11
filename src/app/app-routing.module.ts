import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./modules/general/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { expectedRoles: ['user', 'admin'] },
    loadChildren: () => import('./modules/users/users.module')
      .then(mod => mod.UsersModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { expectedRoles: ['admin'] },
    loadChildren: () => import('./modules/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TranslateModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }