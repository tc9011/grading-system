import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.date = new Date(Date.now());
  }

  getStatus(result: Date): void {

  }

  statusFilter() {}

  goToDetail(workNumber: string) {

  }
}
