import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe({
      next: (token) => { console.log('success' + token); },
      error: (error: any) => {console.log('error' + error); }
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
    // !! will return true if object exists
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}