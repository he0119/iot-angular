import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from '../../_service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    // reset login status
    // this.authorizationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.loading = true;
    this.authorizationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          let message: string;
          if (error.status === 401) {
            message = 'Username or password is incorrect';
          }
          this.snackBar.open(message, 'OK', {
            duration: 2000,
          });
          this.loading = false;
        });
  }

  keyDownFunction(event: { keyCode: number; }) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
}
