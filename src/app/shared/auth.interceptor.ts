import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedRequest = request.clone({
      params: request.params.append('auth', this.authService.userSubject.getValue().token)
    });
    console.log('Intercepted!', copiedRequest);
    return next.handle(copiedRequest);
  }
}
