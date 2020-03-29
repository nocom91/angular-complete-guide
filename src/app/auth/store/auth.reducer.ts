import { User } from "../user.model";
import * as authAction from './auth.actions'

export interface State {
    user: User,
    authError: string,
    loading: boolean
};

const initialState : State = {
    user: null,
    authError: null,
    loading: false
};


export function authReducer(state = initialState, action: authAction.AuthActions) {
    switch(action.type) {
        case authAction.SIGNUP_START:
        case authAction.LOGIN_START: {
            return {
                ...state,
                authError: null,
                loading: true
            }
        };

        case authAction.AUTHENTICATE_SUCCESS: {
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }
        };

        case authAction.AUTHENTICATE_FAIL: {
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        };

        case authAction.LOGOUT: {
            return {
                ...state,
                authError: null,
                user: null
            }
        };

        case authAction.CLEAR_ERROR: {
            return {
                ...state,
                authError: null                
            }
        };

        default: return state;
    }
}