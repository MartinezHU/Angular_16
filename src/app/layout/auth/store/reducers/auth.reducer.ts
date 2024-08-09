import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { Message } from 'src/app/shared/models/entities/message.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authFeatureKey = 'authState';

export const authState = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { tokens }) => ({
    ...state,
    isAuthenticated: true,
    tokens: tokens,
  })),

  on(AuthActions.removeMessages, (state) => ({
    ...state,
    messages: [],
  })),

  on(AuthActions.loginFailure, (state, { payload }) => {
    const errorResponse: HttpErrorResponse = payload;

    const errorMessage =
      errorResponse.error?.detail ||
      errorResponse.message ||
      'Error desconocido';

    const message = new Message();
    message.summary = errorMessage;
    message.severity = 'error';

    const newState = {
      ...state,
      messages: [message], // Reemplaza la lista de mensajes anterior con el nuevo mensaje
    };

    return newState; // Devuelve el nuevo estado modificado
  }),

  on(AuthActions.signUpSuccess, (state, { payload }) => ({
    ...state,
  })),

  on(AuthActions.signUpFailure, (state, { payload }) => {
    const errorResponse: HttpErrorResponse = payload;
    console.log(errorResponse);

    // Suponiendo que errorResponse.error es un objeto con arrays de mensajes de error
    const errorMessages = [];
    for (const key in errorResponse.error) {
      if (errorResponse.error.hasOwnProperty(key)) {
        errorMessages.push(...errorResponse.error[key]);
      }
    }

    const messages = errorMessages.map((errorMsg: string) => {
      const message = new Message();
      message.summary = errorMsg;
      message.severity = 'error';
      return message;
    });

    return {
      ...state,
      messages: [...state.messages, ...messages], // Añadir todos los nuevos mensajes al array existente
    };
  }),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authState(state, action);
}
