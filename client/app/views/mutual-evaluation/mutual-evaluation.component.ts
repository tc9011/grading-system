import { Component, OnInit } from '@angular/core';

import { MutualEvaluationService } from './services/mutual-evaluation.service';
import { AuthService } from '../../core/auth/auth.service';
import { InfoForGetStatus, Status } from './interfaces/mutaul-evaluation';

@Component({
  selector: 'app-mutual-evaluation',
  templateUrl: './mutual-evaluation.component.html',
  styleUrls: ['./mutual-evaluation.component.scss']
})
export class MutualEvaluationComponent implements OnInit {
  date = null;
  tableData = [];
  progress = 0;

  constructor(public MutualEvaluationService: MutualEvaluationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
  }

  getStatus(result: Date): void {
    const date = new Date(result);
    const data: InfoForGetStatus = {
      workNumber: this.authService.currentUser.workNumber,
      group: this.authService.currentUser.group,
      month: date.getFullYear() + '-' + (date.getMonth() + 1),
    };
    this.MutualEvaluationService.getStatus(data).subscribe(
      (data: Status[]) => {
        this.tableData = data;
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

    this.progress = Math.round(finished / allPeople);
  }
}
