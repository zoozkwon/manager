import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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

const routes: Routes = [
  { path: 'master', redirectTo: 'master/Login', pathMatch: 'full' },
  { path: 'master/Login', component: LoginComponent },
  { path: 'master/Home', component: HomeComponent },
  { path: 'master/AcountManage', component: AccountManagementComponent },
  { path: 'master/ManageDetail', component: AccountManagementManagerComponent },
  { path: 'master/NomalDetail', component: AccountManagementNomalComponent },
  { path: 'master/EventManage', component: EventManagementComponent },
  { path: 'master/CategoryManage', component: CategoryManagementComponent },
  { path: 'master/ShopManage', component: ShopManagementComponent },
  { path: 'master/ShopManageDetail', component: ShopManagementDetailComponent },
  { path: 'master/ShopReceive', component: ShopReceiveComponent },
  { path: 'master/ShopReceiveDetail', component: ShopReceiveDetailComponent },
  { path: 'master/UserService', component: UserServiceComponent },
  { path: 'master/UserServiceDetail', component: UserServiceDetailComponent },
  { path: 'master/BoardManage', component: BoardManagementComponent },
  { path: 'master/BoardManageDetail', component: BoardManageDetailComponent },
  { path: 'master/BoardCommentDetail', component: BoardCommentDetailComponent },
  { path: 'master/BoardAnnounDetail', component: BoardAnnounceDetailComponent },
  { path: 'master/BoardAnnounCreate', component: BoardAnnounceCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
