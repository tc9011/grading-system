import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MutualEvaluationService } from './services/mutual-evaluation.service';
import { AuthService } from '../../core/auth/auth.service';
import { InfoForGetStatus, Status } from './interfaces/mutual-evaluation';
import { UntilService } from '../../core/util/until.service';

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

  constructor(public mutualEvaluationService: MutualEvaluationService,
              private authService: AuthService,
              private router: Router,
              private untilService: UntilService) {
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
    this.mutualEvaluationService.getStatus(infoForGetStatus).subscribe(
      (data: Status[]) => {
        this.tableData = data;
        this.displayData = data;
        this.progress = this.untilService.setProgress(this.tableData);
      }
    );
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
    this.displayData = this.untilService.statusFilter(this.status, this.tableData);
  }
}
