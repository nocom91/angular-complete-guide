import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [SharedModule, FormsModule],
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class AuthModule {}