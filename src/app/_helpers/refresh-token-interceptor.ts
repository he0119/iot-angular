import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthorizationService } from '../_service/authorization.service';
import { TokenInterceptor } from './token.interceptor';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private authorizationService: AuthorizationService,
    private tokenInterceptor: TokenInterceptor,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.url.includes('api/refresh')) {
          if ((err.status === 401 && err.error.msg === 'Token has expired')) {
            this.router.navigate(['/login'], {
              queryParams: {
                returnUrl: document.location.pathname
              }
            });
          }
          return throwError(err);
        }

        if (err.url.includes('api/login')) {
          return next.handle(request);
        }

        if (err.status === 401) {
          return this.authorizationService.refresh()
            .pipe(
              mergeMap(() => {
                return this.tokenInterceptor.intercept(request, next);
              }));
        }
      }));
  }
}
