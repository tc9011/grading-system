import { Context } from 'koa';

import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';
import { handleSuccess } from '../../utils/handle';
import { UserModel } from '../models/user';
import { MutualEvaluationModel } from '../models/mutual-evaluation';

export class MutualSummaryCtrl {
  public async getProgress(ctx: Context) {
    const group = ctx.params.group;
    const year = ctx.params.year;
    const month = ctx.params.month;

    // 查user表中同组人员
    const users: any = await UserModel
      .find({group: group})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    const statuses: any = await MutualEvaluationStatusModel
      .find({ group: group, month: year + '-' + month })
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    const allUserLength = users.length - 1;
    let finishedLength = 0;
    for (const user of users) {
      // 排除管理员
      if (user.role < 10) {
        let finishedCount = 0;
        for (const status of statuses) {
          // 如果owner和user的工号相同，且互评为完成状态
          if (status.owner === user.workNumber && status.status) {
            finishedCount++;
            console.log('finshedCount: ' + finishedCount);
          }
        }
        if (finishedCount === allUserLength - 1) {
          // 对除自己以外的人员都已经完成互评
          finishedLength++;
        }
      }
    }

    let progress = Math.round((finishedLength / allUserLength) * 100);
    progress = isNaN(progress) ? 0 : progress;
    handleSuccess({ctx, message: undefined, response: progress});
  }

  public async getTargetMutualSummary(ctx: Context) {
    const filter = ctx.params.filter;
    const body: any = ctx.request.body;
    const { group, month } = body;
    const responseData = [];

    // 查user表中同组人员
    const users: any = await UserModel
      .find({ group: group })
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    // 查当月同组人员的所有互评
    const mutualEvaluations: any = await MutualEvaluationModel
      .find({ group: group, month: month })
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    const mutualEvaluationStatuses: any = await MutualEvaluationStatusModel
      .find({ group: group, month: month })
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    for (const user of users) {
      // 排除管理员
      if (user.role < 10) {
        const responseItem = {
          workNumber: user.workNumber,
          group: user.group,
          realName: user.realName,
          score: 0,
          status: false,
          month: month,
          project: filter,
        };

        // 计算score
        for (const mutualEvaluation of  mutualEvaluations) {
          if (user.workNumber === mutualEvaluation.workNumber) {
            responseItem.score += filter === 'all' ?
              mutualEvaluation.shareRate + mutualEvaluation.achievementRate + mutualEvaluation.contributionRate :
              mutualEvaluation[filter + 'Rate'];
          }
        }

        // 计算status状态
        let statusCount = 0;
        for (const mutualEvaluationStatus of mutualEvaluationStatuses) {
          if (user.workNumber === mutualEvaluationStatus.owner && mutualEvaluationStatus.status) {
            statusCount++;
          }
        }
        // statusCount等于该组用户数减去自己和管理员时，表示该用户互评完成
        responseItem.status = statusCount === (users.length - 2);
        responseData.push(responseItem);
      }
    }
    handleSuccess({ctx, message: undefined, response: responseData});
  }
}
