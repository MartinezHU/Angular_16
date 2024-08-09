import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { JwtToken } from 'src/app/shared/models/entities/jwttoken.model';
import { LoginRequest } from 'src/app/shared/models/entities/loginrequest.model';
import { loginSuccess } from '../store/actions/auth.actions';
import { AuthState } from '../store/state/auth.state';
import { SignUpRequest } from 'src/app/shared/models/entities/signuprequest.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = 'http://localhost:8000/api';
  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store<{ authState: AuthState }>
  ) {}

  login(entidad: LoginRequest): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.url}/auth/token/`, entidad).pipe(
      catchError(this.handleError),
      tap((response: JwtToken) => {
        const tokens = response;
        if (tokens) {
          this.store.dispatch(loginSuccess({ tokens: tokens }));
          this.setTokens(tokens);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  signUp(entidad: SignUpRequest): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/signup/`, entidad).pipe(
      catchError(this.handleError),
      tap((response: JwtToken) => {
        const tokens = response;
        if (tokens) {
          this.store.dispatch(loginSuccess({ tokens: tokens }));
          this.setTokens(tokens);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.removeTokens();
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('accessToken')) {
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  setTokens(tokens: JwtToken): void {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    )
      this.removeTokens();

    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  refreshToken(token: JwtToken) {
    //TODO incluir refresco del token cuando expire el access token
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getProfilePic() {
    const accessToken = this.getAccessToken();
    // console.log(jwtDecode<JwtPayload>(accessToken!).profile_img)
    return jwtDecode<JwtPayload>(accessToken!).profile_img;
  }

  getAuthHeaders() {
    const token = this.getAccessToken();
    return {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    };
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}


interface JwtPayload {
  exp: number;
  iat: number;
  profile_img?: string; // Asegúrate de que esto coincida con el campo del token
}