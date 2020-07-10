import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl()
      }
    );
  }

  register() {
    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe({
    //   next: () => { this.alertService.success('Successfully Registered.'); },
    //   error: (error) => { this.alertService.error(error); }
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
