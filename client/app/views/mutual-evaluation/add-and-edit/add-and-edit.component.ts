import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MutualEvaluationService } from '../services/mutual-evaluation.service';

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
  selfAchievement: string;
  selfShare: string;
  selfContribution: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mutualEvaluationService: MutualEvaluationService) {
    this.selfAchievement = '好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的';
  }

  ngOnInit() {
    this.realName = this.route.snapshot.queryParams.realName;
    this.route.params.subscribe((params: Params) => {
      this.workNumber = params['workNumber'];
      this.year = params['year'];
      this.month = params['month'];
    })
  }

}
