import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { sanitizeHtmlPipe } from './sanitize-html.pipe';

import { ShopManagerModule } from '../../projects/Shop-Manager/src/app/app.module';
import { ShopMasterModule } from '../../projects/Shop-Master/src/app/app.module';

@NgModule({
  declarations: [
    sanitizeHtmlPipe,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopManagerModule.forRoot(),
    ShopMasterModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
