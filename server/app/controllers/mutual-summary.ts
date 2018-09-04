import { Context } from 'koa';

import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';
import { handleSuccess } from '../../utils/handle';
import { UserModel } from '../models/user';

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
}
