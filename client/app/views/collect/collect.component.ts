import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {
  date = null;
  status = 'achievement';

  constructor() { }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
    this.statusFilter();
  }

  getStatus(result: Date): void {

  }

  statusFilter(): void {

  }
}
