import { Component, OnInit } from '@angular/core';

import { SummaryService } from '../services/summary.service';
import { AuthService } from '../../../core/auth/auth.service';
import { MutualSummaryData } from '../interfaces/summary';
import { ModalService } from '../../../core/modal/modal.service';

@Component({
  selector: 'app-mutual-summary',
  templateUrl: './mutual-summary.component.html',
  styleUrls: ['./mutual-summary.component.scss', '../self-summary/self-summary.component.scss']
})
export class MutualSummaryComponent implements OnInit {
  date = null;
  progress = 0;
  status: 'all' | 'achievement' | 'share' | 'contribution';
  displayData = [];
  formatDate: Date;
  tops = [];
  details = [];
  sortName = null;
  sortValue = null;

  constructor(private summaryService: SummaryService,
              private authService: AuthService,
              public modalService: ModalService) {
    this.status = 'all';
  }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
  }

  getStatus(result: Date): void {
    this.formatDate = new Date(result);
    const group = this.authService.currentUser.group;
    const year = this.formatDate.getFullYear().toString();
    const month = (this.formatDate.getMonth() + 1).toString();

    this.summaryService.getMutualStatus(group, year, month).subscribe(
      (res: number) => {
        this.progress = res;
      }
    );
    this.statusFilter();
  }

  statusFilter(): void {
    const year = this.formatDate.getFullYear().toString();
    const month = (this.formatDate.getMonth() + 1).toString();
    const data = {
      group: this.authService.currentUser.group,
      month: year + '-' + month,
    };

    this.summaryService.getMutualSummaryData(this.status, data).subscribe(
      (res: MutualSummaryData[]) => {
        this.displayData = res;
        const tempData = [...this.displayData];
        tempData.sort((a, b) => {
          return a.score < b.score ? 1 : -1;
        });
        this.tops = [];
        for (let i = 0; i < 3; i++) {
          this.tops.push(tempData[i]);
        }
      }
    );
  }

  goToDetail(workNumber: string): void {
    const year = this.formatDate.getFullYear().toString();
    const month = (this.formatDate.getMonth() + 1).toString();
    const postData = {
      workNumber: workNumber,
      group: this.authService.currentUser.group,
      month: year + '-' + month,
      filter: this.status,
    };
    this.summaryService.getMutualEvaluationDetails(postData).subscribe(
      (res: any[]) => {
        this.details = res;
        this.modalService.open();
      }
    );
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    const tmpData = [...this.displayData];
    if (this.sortName && this.sortValue) {
      this.displayData = tmpData.sort((a, b) => {
        return (this.sortValue === 'ascend') ?
          (a[this.sortName] > b[this.sortName] ? 1 : -1) :
          (b[this.sortName] > a[this.sortName] ? 1 : -1);
      });
    } else {
      this.displayData = tmpData;
    }
  }
}
