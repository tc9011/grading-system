import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';
import { SummaryService } from '../services/summary.service';
import { SelfEvaluation } from '../../self-evaluation/interfaces/self-evaluation';

@Component({
  selector: 'app-self-summary',
  templateUrl: './self-summary.component.html',
  styleUrls: ['./self-summary.component.scss']
})
export class SelfSummaryComponent implements OnInit {
  date = null;
  displayData = [];
  formatDate: Date;
  status: string;
  progress = 0;

  constructor(private authService: AuthService,
              private summaryService: SummaryService) {
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
    this.summaryService.getAllSelfEvaluation(group, year, month).subscribe(
      (res: SelfEvaluation[]) => {
        this.displayData = res;
        for (const item of this.displayData) {
          item.status = item.share && item.contribution && item.achievement;
        }
      }
    );
  }

  statusFilter(): void {

  }
}
