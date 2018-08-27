import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PassportService } from '../services/passport.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private modalSrv: NzModalService,
    private passportService: PassportService,
    private authService: AuthService
  ) {
    this.form = fb.group({
      workNumber: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: [null, Validators.required],
    });
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


    // **注：** DEMO中使用 `setTimeout` 来模拟 http
    // 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      res => {
        this.loading = false;
        // 清空路由复用信息
        // this.reuseTabService.clear();
        // 设置Token信息
        /*this.tokenService.set({
          token: '123456789',
          name: this.userName.value,
          email: `cipchk@qq.com`,
          id: 10000,
          time: +new Date(),
        });*/
        // 重新获取 StartupService 内容，若其包括 user 有关的信息的话
        // this.startupSrv.load().then(() => this.router.navigate(['/']));
        // 否则直接跳转
        this.router.navigate(['/']);
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );    // TODO after post doing something and handle error
  }
}
