import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  private url: string = '';

  constructor(
    public http: HttpClient,
    public authService: AuthenticationService
  ) {}

  getAll(): Observable<T> {
    return this.http
      .get<T>(`${this.url}`, this.authService.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${id}`, this.authService.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  create(entidad: T): Observable<T> {
    return this.http
      .post<T>(`${this.url}`, entidad, this.authService.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  update(entidad: T, id: number): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${id}`, entidad, this.authService.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<T> {
    return this.http
      .delete<T>(`${this.url}/${id}`, this.authService.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
