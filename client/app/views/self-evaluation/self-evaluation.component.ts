import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd';

import { LoadingService } from '../../core/loading/loading.service';
import { SelfEvaluationService } from './services/self-evaluation.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {
  form: FormGroup;
  isVisible = false;

  constructor(private fb: FormBuilder,
              public loadingService: LoadingService,
              private selfEvaluationService: SelfEvaluationService,
              private authService: AuthService,
              public msg: NzMessageService,) {
    this.form = this.fb.group({
      workNumber: '',
      month: [null, Validators.required],
      achievement: [null, Validators.required],
      share: [null, Validators.required],
      contribution: [null, Validators.required],
    });
    this.loadingService.end();
  }

  // region: fields
  get workNumber() {
    return this.form.controls.workNumber;
  }

  get month() {
    return this.form.controls.month;
  }

  get achievement() {
    return this.form.controls.achievement;
  }

  get share() {
    return this.form.controls.share;
  }

  get contribution() {
    return this.form.controls.contribution;
  }
  // endregion

  ngOnInit() {
  }

  submit(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;

    this.loadingService.begin();

    this.workNumber.setValue(this.authService.currentUser.workNumber);

    this.selfEvaluationService.postSelfEvaluation(this.form.value).subscribe(
      data => {
        this.loadingService.end();
        this.msg.success('提交成功!');
        this.isVisible = false;
        this.form.reset();
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.form.reset();
  }
}
