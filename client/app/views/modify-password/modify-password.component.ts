import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from '../../core/loading/loading.service';

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
              public loadingService: LoadingService) {
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
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
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

  submit(): void {

  }
}
