import { Context } from 'koa';
import { SelfEvaluationModel } from '../models/self-evaluation';
import { handleSuccess } from '../../utils/handle';
import { UserModel } from '../models/user';
import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';

export class SelfSummaryCtrl {
  public async getAllSelfEvaluationInfo(ctx: Context) {
    const workNumber = ctx.params.workNumber;
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

    const selfEvaluations: any = await SelfEvaluationModel
      .find({group: group, month: year + '-' + month})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    for (const user of users) {
      // users中剔除管理员的信息
      if (user.role < 10) {

        // user表中是否与selfEvaluation表中数据匹配，如果没有匹配就新建一个
        let isExit = false;
        for (const selfEvaluation of selfEvaluations) {
          if (selfEvaluation.workNumber === user.workNumber) {
            isExit = true;
          }
        }
        if (!isExit) {
          const temp = {
            workNumber: user.workNumber,
            month: year + '-' + month,
            achievement: '',
            share: '',
            contribution: '',
            group: user.group,
            role: user.role,
            realName: user.realName,
          };
          selfEvaluations.push(temp);
        }
      }
    }

    handleSuccess({ctx, message: undefined, response: selfEvaluations});
  }
}
