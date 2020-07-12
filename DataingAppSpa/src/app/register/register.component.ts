import { Component, OnInit, Output, EventEmitter, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertService: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

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
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createRegisterForm();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value
      === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    },
      { validators: this.passwordMatchValidator });
  }

  register() {
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      // since we didn't bind to the user object when the form was created
      // we need to set the values now
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe({
        next: () => { this.alertService.success('Successfully Registered.'); },
        error: (error) => { this.alertService.error(error); },
        complete: () => {
          this.authService.login(this.user).subscribe({
            next: () => {
              this.router.navigate(['/members']);
            }
          });
        }
      });
    }

  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
