import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    this.authService.register(this.model).subscribe({
      next: () => { this.alertService.success('Successfully Registered.'); },
      error: (error) => { this.alertService.error(error); }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
