import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { sanitizeHtmlPipe } from './sanitize-html.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ShopManageComponent } from './shop-manage/shop-manage.component';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { ShopReviewsManageComponent } from './shop-reviews-manage/shop-reviews-manage.component';
import { ShopManageDataComponent } from './shop-manage-data/shop-manage-data.component';
import { ShopManageStaffComponent } from './shop-manage-staff/shop-manage-staff.component';
import { ShopManageCourseComponent } from './shop-manage-course/shop-manage-course.component';
import { ShopAddShopsComponent } from './shop-add-shops/shop-add-shops.component';
import { ShopAddShopsStep1Component } from './shop-add-shops-step1/shop-add-shops-step1.component';
import { ShopAddShopsStep2Component } from './shop-add-shops-step2/shop-add-shops-step2.component';
import { ShopAddShopsStep3Component } from './shop-add-shops-step3/shop-add-shops-step3.component';
import { ShopAddShopsStep4Component } from './shop-add-shops-step4/shop-add-shops-step4.component';
import { ShopExtensionComponent } from './shop-extension/shop-extension.component';
import { ShopExtensionStep1Component } from './shop-extension-step1/shop-extension-step1.component';
import { ShopExtensionStep2Component } from './shop-extension-step2/shop-extension-step2.component';


// List of providers
const providers = [];

@NgModule({
  declarations: [
    sanitizeHtmlPipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    ShopManageComponent,
    ShopReviewsComponent,
    ShopReviewsManageComponent,
    ShopManageDataComponent,
    ShopManageStaffComponent,
    ShopManageCourseComponent,
    ShopAddShopsComponent,
    ShopAddShopsStep1Component,
    ShopAddShopsStep2Component,
    ShopAddShopsStep3Component,
    ShopAddShopsStep4Component,
    ShopExtensionComponent,
    ShopExtensionStep1Component,
    ShopExtensionStep2Component
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({})
export class ShopManagerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers
    };
  }
}
