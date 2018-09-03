import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
  }

  getStatus(result: Date): void {
    this.formatDate = new Date(result);
    const infoForGetStatus = {
      workNumber: this.authService.currentUser.workNumber,
      group: this.authService.currentUser.group,
      month: this.formatDate.getFullYear() + '-' + (this.formatDate.getMonth() + 1),
    };
  }

  statusFilter(): void {

  }
}
