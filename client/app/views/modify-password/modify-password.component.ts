import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { LoadingService } from '../../core/loading/loading.service';
import { AuthService } from '../../core/auth/auth.service';
import { PassportService } from '../passport/services/passport.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {
  form: FormGroup;
  error = '';
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  constructor(private fb: FormBuilder,
              public loadingService: LoadingService,
              private authService: AuthService,
              private passportService: PassportService,
              private router: Router,
              public msg: NzMessageService,) {
    this.form = fb.group({
      oldPassword: [
        null,
        [
          Validators.required,
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          ModifyPasswordComponent.checkPassword.bind(this),
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          ModifyPasswordComponent.passwordEquar,
        ],
      ],
    });
  }

  // region: fields
  get oldPassword() {
    return this.form.controls.oldPassword;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }
  // endregion

  ngOnInit() {
  }

  static checkPassword(control: FormControl) {
    if (!control) {
      return null;
    }
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('password').value) {
      return { equar: true };
    }
    return null;
  }

  submit(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) {
      return;
    }

    this.loadingService.begin();

    const submitData = this.form.value;
    submitData.workNumber = this.authService.currentUser.workNumber;
    this.passportService.modifyPassword(submitData).subscribe(
      res => {
        this.loadingService.end();
        this.msg.success('修改成功!');
        this.authService.logout();
        this.router.navigateByUrl('/passport/login');
      }
    );
  }
}
