import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MutualEvaluationService } from '../services/mutual-evaluation.service';
import { AuthService } from '../../../core/auth/auth.service';
import { GetMutualEvaluation, MutualEvaluation } from '../interfaces/mutual-evaluation';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-and-edit',
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.scss']
})
export class AddAndEditComponent implements OnInit {
  workNumber: string;
  realName: string;
  year: string;
  month: string;

  mutualEvaluation = {
    selfAchievement: '',
    selfShare: '',
    selfContribution: '',

    achievementRate: 0,
    shareRate: 0,
    contributionRate: 0,

    mutualAchievement: '',
    mutualShare: '',
    mutualContribution: '',
  };


  constructor(private router: Router,
              private route: ActivatedRoute,
              public msg: NzMessageService,
              private mutualEvaluationService: MutualEvaluationService,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.realName = this.route.snapshot.queryParams.realName;
    this.route.params.subscribe((params: Params) => {
      this.workNumber = params['workNumber'];
      this.year = params['year'];
      this.month = params['month'];
      this.getMutualEvaluation();
    })
  }

  getMutualEvaluation(): void {
    const infoForGetMutualEvaluation = {
      owner: this.authService.currentUser.workNumber,
      workNumber: this.workNumber,
      group: this.authService.currentUser.group,
      month: this.year + '-' + this.month,
    };
    this.mutualEvaluationService.getMutualEvaluation(infoForGetMutualEvaluation).subscribe(
      (data: GetMutualEvaluation) => {
        this.mutualEvaluation = data;
      }
    );
  }

  saveMutualEvaluation(): void {
    const isFinished = this.mutualEvaluation.achievementRate !== 0 && this.mutualEvaluation.shareRate !== 0 && this.mutualEvaluation.contributionRate !== 0;
    const data: MutualEvaluation = {
      owner: this.authService.currentUser.workNumber,
      ownerRealName: this.authService.currentUser.realName,
      month: this.year + '-' + this.month,
      workNumber: this.workNumber,
      realName: this.realName,
      group: this.authService.currentUser.group,
      role: this.authService.currentUser.role,
      status: isFinished,
      mutualAchievement: this.mutualEvaluation.mutualAchievement,
      achievementRate: this.mutualEvaluation.achievementRate,
      mutualShare: this.mutualEvaluation.mutualShare,
      shareRate: this.mutualEvaluation.shareRate,
      mutualContribution: this.mutualEvaluation.mutualContribution,
      contributionRate: this.mutualEvaluation.contributionRate,
    };

    this.mutualEvaluationService.postMutualEvaluation(data).subscribe(
      () => {
        this.msg.success('保存成功！');
        this.router.navigate(['/mutualevaluation']);
      }
    );
  }
}
