import { Component, OnInit } from '@angular/core';
import { CollectService } from './services/collect.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {
  date = null;
  status = 'achievement';
  formatDate: string;
  details = [];

  constructor(private collectService: CollectService,
              private authService: AuthService) { }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
    this.statusFilter();
  }

  getStatus(result: Date): void {
    const date = new Date(result);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    this.formatDate = year + '-' + month;

    this.statusFilter();
  }

  statusFilter(): void {
    const group = this.authService.currentUser.group;
    const workNumber = this.authService.currentUser.workNumber;

    this.collectService.getCollects(workNumber, group, this.formatDate, this.status).subscribe(
      (res: string[]) => {
        this.details = res;
      }
    );
  }
}
