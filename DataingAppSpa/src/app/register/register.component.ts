import { Component, OnInit, Output, EventEmitter, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private alertService: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.registerForm = new FormGroup(
    //   {
    //     username: new FormControl('hi', Validators.required),
    //     password: new FormControl('', [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8)
    //     ]),
    //     confirmPassword: new FormControl('', Validators.required)
    //   },
    //   this.passwordMatchValidator
    // );
    this.createRegisterForm();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value
      === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    },
    {validators: this.passwordMatchValidator});
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
