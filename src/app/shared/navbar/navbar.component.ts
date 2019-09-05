import { Component, OnInit } from '@angular/core';

import { SECTIONS, User } from '../documentation-items';

import { UserService } from '../../_service/user.service';
import { AuthorizationService } from '../../_service/authorization.service';
import { Router } from '@angular/router';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string;

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authorizationService.missionAnnounced$.subscribe(
      (res) => {
        if (res === 'update') {
          this.update_username();
        }
      }
    );
    this.update_username();
  }

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  get is_login() {
    return this.authorizationService.isAuthenticated();
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: document.location.pathname
      }
    });
  }

  update_username() {
    this.userService.userInfo().subscribe((res: User) => {
      this.userName = res.username;
    });
  }
}
