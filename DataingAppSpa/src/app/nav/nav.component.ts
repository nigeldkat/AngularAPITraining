import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(
    public authService: AuthService,
    private alertService: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe({
      next: (token) => {
        console.log('success' + token);
        this.router.navigate(['/members']);
      },
      error: (error: any) => {console.log(error); }

    });
  }

  loggedIn() {
    return this.authService.loggedIn();
    this.router.navigate(['/home']);
    // retained becuase I liked the !! example
    // const token = localStorage.getItem('token');
    // return !!token;
    // !! will return true if object exists
  }

  logout() {
    localStorage.removeItem('token');
    this.alertService.message('logged out');
  }

}
