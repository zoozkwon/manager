import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopManageComponent } from './shop-manage/shop-manage.component';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { ShopReviewsManageComponent } from './shop-reviews-manage/shop-reviews-manage.component';
import { ShopAddShopsComponent } from './shop-add-shops/shop-add-shops.component';
import { ShopAddShopsStep1Component } from './shop-add-shops-step1/shop-add-shops-step1.component';
import { ShopAddShopsStep2Component } from './shop-add-shops-step2/shop-add-shops-step2.component';
import { ShopAddShopsStep3Component } from './shop-add-shops-step3/shop-add-shops-step3.component';
import { ShopAddShopsStep4Component } from './shop-add-shops-step4/shop-add-shops-step4.component';
import { ShopExtensionComponent } from './shop-extension/shop-extension.component';
import { ShopExtensionStep1Component } from './shop-extension-step1/shop-extension-step1.component';
import { ShopExtensionStep2Component } from './shop-extension-step2/shop-extension-step2.component';

const routes: Routes = [
  { path: 'manager', redirectTo: 'manager/Login', pathMatch: 'full' },
  { path: 'manager/Home', component: HomeComponent },
  { path: 'manager/Login', component: LoginComponent },
  { path: 'manager/Register', component: RegisterComponent },
  { path: 'manager/ShopAddListing', component: ShopAddShopsComponent },
  { path: 'manager/ShopAddListing/step1', component: ShopAddShopsStep1Component },
  { path: 'manager/ShopAddListing/step2', component: ShopAddShopsStep2Component },
  { path: 'manager/ShopAddListing/step3', component: ShopAddShopsStep3Component },
  { path: 'manager/ShopAddListing/step4', component: ShopAddShopsStep4Component },
  { path: 'manager/ShopExt', component: ShopExtensionComponent },
  { path: 'manager/ShopExt/step1', component: ShopExtensionStep1Component },
  { path: 'manager/ShopExt/step2', component: ShopExtensionStep2Component },
  { path: 'manager/ShopManage', component: ShopManageComponent },
  { path: 'manager/ShopReviews', component: ShopReviewsComponent },
  { path: 'manager/ShopReviews/Manage', component: ShopReviewsManageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
