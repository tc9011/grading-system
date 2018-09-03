import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';
import { SummaryService } from '../services/summary.service';
import { SelfEvaluation } from '../../self-evaluation/interfaces/self-evaluation';
import { UntilService } from '../../../core/util/until.service';
import { ModalService } from '../../../core/modal/modal.service';
import { SelfEvaluationService } from '../../self-evaluation/services/self-evaluation.service';

@Component({
  selector: 'app-self-summary',
  templateUrl: './self-summary.component.html',
  styleUrls: ['./self-summary.component.scss']
})
export class SelfSummaryComponent implements OnInit {
  date = null;
  displayData = [];
  tableData = [];
  formatDate: Date;
  status = 'all';
  progress = 0;
  achievement = '';
  share = '';
  contribution = '';

  constructor(private authService: AuthService,
              private summaryService: SummaryService,
              private untilService: UntilService,
              public modalService: ModalService,
              private selfEvaluationService: SelfEvaluationService) {
  }

  ngOnInit() {
    this.date = new Date(Date.now());
    this.getStatus(this.date);
  }

  getStatus(result: Date): void {
    this.formatDate = new Date(result);

    const workNumber = this.authService.currentUser.workNumber;
    const group = this.authService.currentUser.group;
    const year = this.formatDate.getFullYear().toString();
    const month = (this.formatDate.getMonth() + 1).toString();
    this.summaryService.getAllSelfEvaluation(workNumber, group, year, month).subscribe(
      (res: SelfEvaluation[]) => {
        this.displayData = res;
        this.tableData = res;
        for (const item of this.displayData) {
          item.status = item.share && item.contribution && item.achievement;
        }
        this.progress = this.untilService.setProgress(this.displayData);
      }
    );
  }

  statusFilter(): void {
    this.displayData = this.untilService.statusFilter(this.status, this.tableData);
  }

  goToDetail(user: string): void {
    const year = this.formatDate.getFullYear().toString();
    const month = (this.formatDate.getMonth() + 1).toString();

    this.selfEvaluationService.getSelfEvaluationByMonth(user, year + '-' + month).subscribe(
      (data: SelfEvaluation[]) => {
        this.achievement = data[0].achievement ? data[0].achievement : '';
        this.share = data[0].share ? data[0].share : '';
        this.contribution = data[0].contribution ? data[0].contribution : '';
        this.modalService.open();
      }
    );
  }
}
