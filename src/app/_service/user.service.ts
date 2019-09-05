import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../shared/documentation-items';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'api/users';

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  userInfo() {
    if (this.authorizationService.isAuthenticated()) {
      return this.http.get<User>(this.API_URL);
    }
    return of();
  }
}
