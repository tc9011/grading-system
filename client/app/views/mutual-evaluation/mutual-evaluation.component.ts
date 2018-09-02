import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MutualEvaluationService } from './services/mutual-evaluation.service';
import { AuthService } from '../../core/auth/auth.service';
import { InfoForGetStatus, Status } from './interfaces/mutual-evaluation';

@Component({
  selector: 'app-mutual-evaluation',
  templateUrl: './mutual-evaluation.component.html',
  styleUrls: ['./mutual-evaluation.component.scss']
})
export class MutualEvaluationComponent implements OnInit {
  date = null;
  tableData = [];
  displayData = [];
  progress = 0;
  formatDate: Date;
  status = 'all';

  constructor(public MutualEvaluationService: MutualEvaluationService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
  }

  getStatus(result: Date): void {
    this.formatDate = new Date(result);
    const infoForGetStatus: InfoForGetStatus = {
      workNumber: this.authService.currentUser.workNumber,
      group: this.authService.currentUser.group,
      month: this.formatDate.getFullYear() + '-' + (this.formatDate.getMonth() + 1),
    };
    this.MutualEvaluationService.getStatus(infoForGetStatus).subscribe(
      (data: Status[]) => {
        this.tableData = data;
        this.displayData = data;
        this.setProgress();
      }
    );
  }

  setProgress(): void {
    const allPeople = this.tableData.length;
    let finished = 0;
    for (const item of this.tableData) {
      if (item.status) {
        finished++;
      }
    }
    console.log(finished);
    console.log(allPeople);

    this.progress = Math.round((finished / allPeople) * 100);
    this.progress = isNaN(this.progress) ? 0 : this.progress;
  }

  goToAdd(workNumber: string, realName: string): void {
    this.router.navigate([
      '/mutualevaluation',
      this.formatDate.getFullYear(),
      this.formatDate.getMonth() + 1,
      workNumber
    ], {
      queryParams: {
        'realName': realName
      }
    });
  }

  statusFilter(): void {
    if (this.status === 'unfinished') {
      this.displayData = [];
      for (const item of this.tableData) {
        if (!item.status) {
          this.displayData.push(item);
        }
      }
    } else {
      this.displayData = this.tableData;
    }
  }
}
