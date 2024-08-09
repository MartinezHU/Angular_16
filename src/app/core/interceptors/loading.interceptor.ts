import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoadingScreenComponent } from '../../shared/complements/loading-screen/loading-screen.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private spinnerRef: any;
  private requestCount = 0;

  constructor(private dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showSpinner();
    this.requestCount++;

    return next.handle(req).pipe(finalize(() => {
      this.requestCount--;
      if (this.requestCount === 0) {
        this.hideSpinner();
      }
    }));
  }

  private showSpinner(): void {
    if (!this.spinnerRef) {
      this.spinnerRef = this.dialog.open(LoadingScreenComponent, {
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'transparent',
      });
    }
  }

  private hideSpinner(): void {
    if (this.spinnerRef) {
      this.spinnerRef.close();
      this.spinnerRef = null;
    }
  }

  // private hideSpinner(): void {
  //   if (this.spinnerRef) {
  //     setTimeout(() => { // Añadir un retraso antes de cerrar el spinner
  //       this.spinnerRef.close();
  //       this.spinnerRef = null;
  //     }, 2000); // Retraso de 1 segundo antes de cerrar el spinner
  //   }
  // }
}
