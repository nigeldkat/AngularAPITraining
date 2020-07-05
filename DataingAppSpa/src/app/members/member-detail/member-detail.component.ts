import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    // the + is used to convert to a number
    // tslint didn't like formatting of below
    // this.userService.getUser(+this.route.snapshot.params['id']).subscribe({

    this.userService.getUser(+this.route.snapshot.params.id).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: error => {
        this.alertify.error(error);
      }
    });
  }

}
