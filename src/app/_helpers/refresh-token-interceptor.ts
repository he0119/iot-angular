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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const errorResponse = err as HttpErrorResponse;
        if (errorResponse.url.includes('api/refresh')) {
          if ((errorResponse.status === 401 && errorResponse.error.msg === 'Token has expired') || (errorResponse.status === 422)) {
            this.router.navigate(['/login'], {
              queryParams: {
                returnUrl: document.location.pathname
              }
            });
          }
          return throwError(err);
        }
        if (errorResponse.url.includes('api/login')) {
          return next.handle(req);
        }
        if ((errorResponse.status === 401 && errorResponse.error.msg === 'Token has expired') ||
          (errorResponse.status === 422) && !errorResponse.url.includes('api/refresh')) {
          return this.authorizationService.refresh().pipe(mergeMap(() => {
            return this.tokenInterceptor.intercept(req, next);
          }));
        }
      }));
  }
}
