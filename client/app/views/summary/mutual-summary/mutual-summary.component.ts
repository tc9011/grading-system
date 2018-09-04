import { Component, OnInit } from '@angular/core';

import { SummaryService } from '../services/summary.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-mutual-summary',
  templateUrl: './mutual-summary.component.html',
  styleUrls: ['./mutual-summary.component.scss', '../self-summary/self-summary.component.scss']
})
export class MutualSummaryComponent implements OnInit {
  date = null;
  progress = 0;
  status = 'achievement';
  displayData = [];
  formatDate: Date;

  constructor(private summaryService: SummaryService,
              private authService: AuthService) { }

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
  }

  statusFilter() {}

  goToDetail(workNumber: string) {

  }
}
