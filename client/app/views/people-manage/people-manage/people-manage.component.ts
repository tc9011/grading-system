import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';

import { DisplayTableData } from '../../self-evaluation/interfaces/self-evaluation';
import { PeopleManageService } from '../services/people-manage.service';
import { AuthService } from '../../../core/auth/auth.service';
import { GetPeopleInfo } from '../interfaces/people-manage';

@Component({
  selector: 'app-people-manage',
  templateUrl: './people-manage.component.html',
  styleUrls: ['./people-manage.component.scss']
})
export class PeopleManageComponent implements OnInit {
  tableData = [];
  tmpData = [];
  displayData = [];   // 当前页表格
  sortName = null;
  sortValue = null;
  allChecked = false;
  indeterminate = false;
  disabledButton = false;

  constructor(private modalService: NzModalService,
              private peopleManageService: PeopleManageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getAllGroupUsers();
  }

  getAllGroupUsers() {
    const group = this.authService.currentUser.group;
    this.peopleManageService.getAllGroupUsers(group).subscribe(
      (res: GetPeopleInfo[]) => {
        this.tableData = res;
      }
    );
  }

  currentPageDataChange($event: Array<DisplayTableData>): void {
    this.displayData = $event;
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
        return (this.sortValue === 'ascend') ?
          (parseInt(a[this.sortName], 10) > parseInt(b[this.sortName], 10) ? 1 : -1) :
          (parseInt(b[this.sortName], 10) > parseInt(a[this.sortName], 10) ? 1 : -1);
      });
    } else {
      this.tableData = this.tmpData;
    }
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.tableData.some(value => value.checked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle     : '确定要删除选中的自评吗?',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzCancelText: '取消',
      nzIconType: 'exclamation-circle'
    });
  }
}
