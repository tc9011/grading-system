import { Context } from 'koa';

import { BaseCtrl } from './base';
import { MutualEvaluationModel } from '../models/mutual-evaluation';
import { SelfEvaluationModel } from '../models/self-evaluation';
import { handleSuccess } from '../../utils/handle';
import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';

export class MutualEvaluationCtrl extends BaseCtrl {
  model = MutualEvaluationModel;

  public async getMutualEvaluation(ctx: Context) {
    const body: any = ctx.request.body;
    const {owner, workNumber, group, month} = body;
    const responseData = {
      selfAchievement: '未填写',
      selfShare: '未填写',
      selfContribution: '未填写',
      mutualAchievement: '',
      achievementRate: 0,
      mutualShare: '',
      shareRate: 0,
      mutualContribution: '',
      contributionRate: 0,
    };

    const selfEvaluation: any= await SelfEvaluationModel
      .findOne({workNumber: workNumber, month: month})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    if (selfEvaluation) {
      responseData.selfAchievement = selfEvaluation.achievement;
      responseData.selfShare = selfEvaluation.share;
      responseData.selfContribution = selfEvaluation.contribution;
    }

    const mutualEvaluation: any = await MutualEvaluationModel
      .findOne({owner: owner, workNumber: workNumber, month: month, group: group})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    if (mutualEvaluation) {
      responseData.mutualAchievement = mutualEvaluation.mutualAchievement;
      responseData.achievementRate = mutualEvaluation.achievementRate;
      responseData.mutualShare = mutualEvaluation.mutualShare;
      responseData.shareRate = mutualEvaluation.shareRate;
      responseData.mutualContribution = mutualEvaluation.mutualContribution;
      responseData.contributionRate = mutualEvaluation.contributionRate;
    }

    handleSuccess({ctx, message: undefined, response: responseData});
  }

  public async save(ctx: Context) {
    const body: any = ctx.request.body;
    const {owner, workNumber, group, month, status} = body;

    // 更新status中的状态
    await MutualEvaluationStatusModel
      .update({owner: owner, workNumber: workNumber, group: group, month: month}, {status: status})
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'update出错');
      });

    await MutualEvaluationModel
      .update({owner: owner, workNumber: workNumber, month: month, group: group}, body, {upsert: true})
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'update出错');
      });
    handleSuccess({ctx, message: undefined});
  }
}
