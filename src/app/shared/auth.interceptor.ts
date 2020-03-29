import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "../auth/auth.service";
import * as fromApp from '../store/app.reducer';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      map(state=> state.user),
      switchMap(user => {
        const copiedRequest = request.clone({
          params: request.params.append('auth', user.token)
        });
        console.log('Intercepted!', copiedRequest);
        return next.handle(copiedRequest);
      })
    );
    
  }
}
