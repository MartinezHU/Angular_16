import { createAction, props } from '@ngrx/store';
import { JwtToken } from 'src/app/shared/models/entities/jwttoken.model';
import { Message } from 'src/app/shared/models/entities/message.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from 'src/app/shared/models/entities/loginrequest.model';
import { SignUpRequest } from 'src/app/shared/models/entities/signuprequest.model';

export const loginRequest = createAction(
  'loginRequest',
  props<{ loginRequest: LoginRequest }>()
);

export const loginSuccess = createAction(
  'loginSuccess',
  props<{ tokens: JwtToken }>()
);

export const loginFailure = createAction(
  'loginFailure',
  props<{ payload: HttpErrorResponse }>()
);

export const setLoginMessages = createAction(
  'setLoginMessages',
  props<{ payload: Message }>()
);

export const signUpRequest = createAction(
  'signUpRequest',
  props<{ signUpRequest: SignUpRequest }>()
);

export const signUpSuccess = createAction(
  'registerSuccess',
  props<{ payload: Message }>()
);

export const signUpFailure = createAction(
  'registerFailure',
  props<{ payload: HttpErrorResponse }>()
);

export const removeMessages = createAction('removeMessages');
