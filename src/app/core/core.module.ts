import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LogginInterceptor } from './../shared/logging.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LogginInterceptor,
    //   multi: true
    // }
  ]
})
export class CoreModule { }
