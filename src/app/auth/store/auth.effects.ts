import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as authActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (resData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

    localStorage.setItem('userData',
        JSON.stringify(user));

    return new authActions.AuthenticateSuccess({
        email: resData.email,
        userId: resData.localId,
        token: resData.idToken,
        expirationDate: expirationDate,
        redirect: true
    });
};

const handleError = (errorRes) => {
    let errorMessage: string = 'An error occured';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new authActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'The email address is already in use by another account.'; break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'; break;
        case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password.'; break;
        default: errorMessage = errorRes.error.error.message; break;
    }
    return of(new authActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(authActions.SIGNUP_START),
        switchMap((signupAction: authActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArbEqi6C27HBZJuZ9F6CKfsbvQdiWi3zA',
                {
                    email: signupAction.payload.login,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((resData) => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                map((resData: AuthResponseData) => handleAuthentication(resData)),
                catchError((errorRes) => handleError(errorRes))                
            );
        })
    );

    @Effect()
    authLogin  = this.actions$.pipe(
        ofType(authActions.LOGIN_START),
        switchMap((authData: authActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArbEqi6C27HBZJuZ9F6CKfsbvQdiWi3zA',
                {
                    email: authData.payload.login,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((resData) => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                map((resData: AuthResponseData) => handleAuthentication(resData)),
                catchError((errorRes) => handleError(errorRes))
                
            );
        }));

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(authActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: authActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    )

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(authActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(authActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email:string,
                id:string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if(!userData) {
                return {type: 'DUMMY'};
            }
    
            const loadedUser = new User(userData.email, 
                userData.id, 
                userData._token,
                new Date(userData._tokenExpirationDate));
    
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new authActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
            }
            return {type: 'DUMMY'};
        })
    )

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}
}