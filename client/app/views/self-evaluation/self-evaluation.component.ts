import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { LoadingService } from '../../core/loading/loading.service';
import { SelfEvaluationService } from './services/self-evaluation.service';
import { AuthService } from '../../core/auth/auth.service';
import { DisplayTableData } from './interfaces/self-evaluation';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {
  form: FormGroup;
  isVisible = false;
  tableData = [];     // 所有表格数据
  tmpData: Array<DisplayTableData>;
  sortName = null;
  sortValue = null;
  allChecked = false;
  indeterminate = false;
  disabledButton = false;
  user: string;

  constructor(private fb: FormBuilder,
              public loadingService: LoadingService,
              private selfEvaluationService: SelfEvaluationService,
              private authService: AuthService,
              public msg: NzMessageService,
              private modalService: NzModalService) {
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
    this.user = this.authService.currentUser.workNumber;
    this.getTableInfo();
  }

  getTableInfo(): void {
    this.selfEvaluationService.getAllSelfEvaluation(this.user).subscribe(
      data => {
        this.tableData = data;
        this.tableData.forEach(value => {
          this.spliceWords(value);
          value.checked = false;
        });
      }
    );
  }

  spliceWords(value: DisplayTableData) {
    const attrArray = ['achievement', 'share', 'contribution'];
    for (const attr of attrArray) {
      value[attr] = value[attr].length > 20 ? <string>value[attr].substring(0, 20) + '....' : value[attr];
    }
    return value;
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    this.tmpData = [...this.tableData];
    if (this.sortName && this.sortValue) {
      this.tableData = this.tmpData.sort((a, b) => {
        const former = new Date(a[this.sortName]).getTime();
        const latter = new Date(b[this.sortName]).getTime();
        return (this.sortValue === 'ascend') ? (former > latter ? 1 : -1) : (latter > former ? 1 : -1);
      });
    } else {
      this.tableData = this.tmpData;
    }
  }

  refreshStatus(): void {
    const allChecked = this.tableData.every(value => value.checked === true);
    const allUnChecked = this.tableData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.tableData.some(value => value.checked);
  }

  checkAll(value: boolean): void {
    this.tableData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  edit(month: string) {
    this.showModal();
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle     : '确定要删除选中的自评吗?',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : this.delete.bind(this),
      nzCancelText: '取消',
      nzIconType: 'exclamation-circle'
    });
  }

  delete(): void {
    const checkedData = [];

    this.tableData.forEach(data => {
      if (data.checked) {
        checkedData.push(data.month);
      }
    });

    this.selfEvaluationService.deleteSelfEvaluation(this.user, checkedData).subscribe(
      data => {
        this.msg.success('删除成功!');
        this.getTableInfo();
      }
    );
  }

  submit(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;

    this.loadingService.begin();

    this.workNumber.setValue(this.user);

    this.selfEvaluationService.postSelfEvaluation(this.form.value).subscribe(
      data => {
        this.loadingService.end();
        this.msg.success('提交成功!');
        this.isVisible = false;
        this.form.reset();
        this.getTableInfo();
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
