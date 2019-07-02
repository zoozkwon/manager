import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { sanitizeHtmlPipe } from './sanitize-html.pipe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AccountManagementManagerComponent } from './account-management-manager/account-management-manager.component';
import { AccountManagementNomalComponent } from './account-management-nomal/account-management-nomal.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { UserServiceComponent } from './user-service/user-service.component';
import { ShopReceiveComponent } from './shop-receive/shop-receive.component';
import { ShopManagementDetailComponent } from './shop-management-detail/shop-management-detail.component';
import { ShopReceiveDetailComponent } from './shop-receive-detail/shop-receive-detail.component';
import { UserServiceDetailComponent } from './user-service-detail/user-service-detail.component';
import { BoardManagementComponent } from './board-management/board-management.component';
import { BoardManageDetailComponent } from './board-manage-detail/board-manage-detail.component';
import { BoardCommentDetailComponent } from './board-comment-detail/board-comment-detail.component';
import { BoardAnnounceDetailComponent } from './board-announce-detail/board-announce-detail.component';
import { BoardAnnounceCreateComponent } from './board-announce-create/board-announce-create.component';

// List of providers
const providers = [];

@NgModule({
  declarations: [
    sanitizeHtmlPipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    AccountManagementComponent,
    AccountManagementManagerComponent,
    AccountManagementNomalComponent,
    EventManagementComponent,
    CategoryManagementComponent,
    ShopManagementComponent,
    UserServiceComponent,
    ShopReceiveComponent,
    ShopManagementDetailComponent,
    ShopReceiveDetailComponent,
    UserServiceDetailComponent,
    BoardManagementComponent,
    BoardManageDetailComponent,
    BoardCommentDetailComponent,
    BoardAnnounceDetailComponent,
    BoardAnnounceCreateComponent
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
export class ShopMasterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers
    };
  }
}