import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzModalService } from 'ng-zorro-antd';

import { PassportService } from '../services/passport.service';
import { AuthService } from '../../../core/auth/auth.service';
import { LoadingService } from '../../../core/loading/loading.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  error = '';

  constructor(
    fb: FormBuilder,
    private router: Router,
    private modalSrv: NzModalService,
    private passportService: PassportService,
    private authService: AuthService,
    public loadingService: LoadingService,
  ) {
    this.form = fb.group({
      workNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          RegisterComponent.checkWorkNumber,
        ]
      ],
      password: [null, Validators.required],
    });
    this.loadingService.end();
    modalSrv.closeAll();
  }

  // region: fields
  get workNumber() {
    return this.form.controls.workNumber;
  }

  get password() {
    return this.form.controls.password;
  }

  // endregion
  submit() {
    this.error = '';

    this.workNumber.markAsDirty();
    this.workNumber.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.workNumber.invalid || this.password.invalid) {
      return;
    }

    this.loadingService.begin();
    this.authService.login(this.form.value).subscribe(
      res => {
        this.loadingService.end();

        this.router.navigate(['/']);
      }
    );
  }
}
