import { Context } from 'koa';

import { MutualEvaluationModel } from '../models/mutual-evaluation';
import { handleSuccess } from '../../utils/handle';

export class CollectCtrl {
  public async getCollectByMonth(ctx: Context) {
    const body: any = ctx.request.body;
    const { workNumber, group, month, filter } = body;
    const responseData = [];

    const mutualEvaluations: any = await MutualEvaluationModel
      .find({ workNumber: workNumber, group: group, month: month })
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    // 首字母大写
    const upperCaseFilter = filter.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

    for (const mutualEvaluation of mutualEvaluations) {
      responseData.push(mutualEvaluation['mutual' + upperCaseFilter]);
    }

    handleSuccess({ctx, message: undefined, response: responseData});
  }
}
