import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopManagerModule } from '../../projects/Shop-Manager/src/app/app.module';
import { ShopMasterModule } from '../../projects/Shop-Master/src/app/app.module';

const routes: Routes = [
  {
    path: 'manager',
    loadChildren: '../../projects/Shop-Manager/src/app/app.module#ShopManagerModule'
  },
  {
    path: 'master',
    loadChildren: '../../projects/Shop-Master/src/app/app.module#ShopMasterModule'
  },
  { path: '**', redirectTo: '/manager/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ShopManagerModule.forRoot(),
    ShopMasterModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
