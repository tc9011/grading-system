import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from '../../core/loading/loading.service';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {
  form: FormGroup;
  isVisible = false;

  constructor(private fb: FormBuilder,
              public loadingService: LoadingService) {
    this.form = this.fb.group({
      achievement: [null, Validators.required],
      share: [null, Validators.required],
      contribution: [null, Validators.required],
    });
    this.loadingService.end();
  }

  // region: fields
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

  submit() {
    window.setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
