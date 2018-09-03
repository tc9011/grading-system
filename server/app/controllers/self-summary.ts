import { Context } from 'koa';
import { SelfEvaluationModel } from '../models/self-evaluation';
import { handleSuccess } from '../../utils/handle';

export class SelfSummaryCtrl {
  public async getAllSelfEvaluationInfo(ctx: Context) {
    const group = ctx.params.group;
    const year = ctx.params.year;
    const month = ctx.params.month;

    const selfEvaluations = await SelfEvaluationModel
      .find({group: group, month: year + '-' + month})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    console.log(selfEvaluations);
    handleSuccess({ctx, message: undefined, response: selfEvaluations});
  }
}
