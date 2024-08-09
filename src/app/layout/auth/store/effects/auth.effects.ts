import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';
import { JwtToken } from 'src/app/shared/models/entities/jwttoken.model';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((action) =>
        this.authService.login(action.loginRequest).pipe(
          map((response: JwtToken) =>
            AuthActions.loginSuccess({ tokens: response })
          ),
          catchError((payload) => of(AuthActions.loginFailure({ payload })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.authService.setTokens(action.tokens);
          this.router.navigateByUrl('');
        })
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpRequest),
      mergeMap((action) =>
        this.authService.signUp(action.signUpRequest).pipe(
          map((response: any) =>
            AuthActions.loginSuccess({ tokens: response })
          ),
          catchError((payload) => of(AuthActions.signUpFailure({ payload }))),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}
}
