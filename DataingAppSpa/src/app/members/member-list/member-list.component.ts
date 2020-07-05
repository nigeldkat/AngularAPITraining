import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: AlertifyService) { }

  ngOnInit() {
    //this.loadUsers();
    this.route.data.subscribe( data => {
      this.users = data.users;
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe({
  //     next: (users: User[]) => {
  //       this.users = users;
  //     },
  //     error: error => {this.alertService.error(error);}
  //   });
  // }

}
