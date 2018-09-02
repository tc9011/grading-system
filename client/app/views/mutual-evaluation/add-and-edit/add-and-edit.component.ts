import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MutualEvaluationService } from '../services/mutual-evaluation.service';
import { AuthService } from '../../../core/auth/auth.service';
import { GetMutualEvaluation } from '../interfaces/mutaul-evaluation';

@Component({
  selector: 'app-add-and-edit',
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.scss']
})
export class AddAndEditComponent implements OnInit {
  workNumber: string;
  realName: string;
  year: string;
  month: string;    // TODO 修改自评month为string，且存为2018-9

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

  getMutualEvaluation() {
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

}
