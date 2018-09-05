import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { PassportService } from '../services/passport.service';
import { LoadingService } from '../../../core/loading/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
  allGroup = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private passportService: PassportService,
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
      realName: [null, Validators.required],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          RegisterComponent.checkPassword.bind(this),
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          RegisterComponent.passwordEquar,
        ],
      ],
      group: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
    this.loadingService.end();
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups(): void {
    this.passportService.getGroups().subscribe(
      (res: string[]) => {
        this.allGroup = res;
      }
    );
  }

  static checkWorkNumber(control: FormControl) {
    if (!control) {
      return null;
    }
    const reg = /^\d{8}$/;
    if (!reg.test(control.value)) {
      return { isNumber: true };
    }
    return null;
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

  // region: fields
  get workNumber() {
    return this.form.controls.workNumber;
  }
  get realName() {
    return this.form.controls.realName;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }
  get group() {
    return this.form.controls.group;
  }
  get role() {
    return this.form.controls.role;
  }

  // endregion
  submit() {
    this.error = '';
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) {
      return;
    }

    this.loadingService.begin();
    this.form.value.role = parseInt(this.form.value.role, 10);
    this.passportService.postRegister(this.form.value).subscribe(
      res => {
        this.loadingService.end();
        this.msg.success('注册成功!');
        this.router.navigate(['/passport/login']);
      }
    );
  }

}
