import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  loginCheckUrl = 'api/login';
  refreshTokenUrl = 'api/refresh';

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {
  }

  login(form: any): Observable<any> {

    const postObservable = this.httpClient.post<any>(this.loginCheckUrl, form);

    const subject = new ReplaySubject<any>(1);
    subject.subscribe((r: any) => {
      this.setAccessToken(r.access_token);
      this.setRefreshToken(r.refresh_token);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    postObservable.subscribe(subject);
    return subject;
  }

  refresh(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getRefreshToken()}`);

    const refreshObservable = this.httpClient.get<any>(this.refreshTokenUrl, { headers });

    const refreshSubject = new ReplaySubject<any>(1);
    refreshSubject.subscribe((r: any) => {
      this.setAccessToken(r.access_token);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }

  logout() {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.getRefreshToken();
  }

  private handleAuthenticationError(err: any) {
    let errorString: string;

    if (err.status === 401 || err.status === 422) {
      this.logout();
      errorString = 'Token has expired';
    } else {
      errorString = 'Authorization Error';
    }
    this.errorMessage(errorString);
  }

  private errorMessage(msg: string) {
    let reloadString: string;
    reloadString = 'Reload';
    const snack = this.snackbar.open(msg, reloadString, {
      duration: 6000,
    });

    snack
      .onAction()
      .subscribe(() => {
      });
  }

  private setAccessToken(accessToken: string) {
    if (!accessToken) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', accessToken);
    }
  }

  private setRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      localStorage.removeItem('refresh_token');
    } else {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}
