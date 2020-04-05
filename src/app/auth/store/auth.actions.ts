import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthenticateSuccess implements Action {
    readonly type: string = AUTHENTICATE_SUCCESS;

    constructor(public payload: {
        email: string, 
        userId: string,
        token: string,
        expirationDate: Date,
        redirect: boolean;
    }) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    constructor(public payload: any = null){}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {login: string; password: string}) {}
}


export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {login: string; password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
    constructor(public payload: any = null){}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;    
    constructor(public payload: any = null){}
}

export type AuthActions = AuthenticateSuccess | 
Logout | 
AuthenticateFail |
LoginStart |
SignupStart | 
ClearError |
AutoLogin;