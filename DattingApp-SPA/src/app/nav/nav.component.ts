import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userLogin: any = {};
  constructor(public authService: AuthService, private alertService: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userLogin).subscribe(next => {
      this.alertService.success('Logged in successfully');
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.userLogin = {};
    this.router.navigate(['/home']);
  }

}
