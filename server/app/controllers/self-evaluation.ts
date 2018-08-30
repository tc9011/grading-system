import { Context } from 'koa';

import { SelfEvaluationModel } from '../models/self-evaluation';
import { Base } from '../models/base';
import { handleError, handleSuccess } from '../../utils/handle';

export class SelfEvaluationCtrl extends Base{
  model = SelfEvaluationModel;

  async save (ctx: Context) {
    const body: any = ctx.request.body;
    const {workNumber, month, achievement, share, contribution} = body;

    if (!workNumber) {
      ctx.status = 404;
      handleError({ctx, message: '登录信息有问题，请尝试刷新浏览器或者重新登录!'});
    }

    const selfEvaluations: any = await SelfEvaluationModel
      .find({workNumber: workNumber})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    console.log(selfEvaluations);
    if (selfEvaluations.length) {
      for (const selfEvaluation of selfEvaluations) {
        if (new Date(month).getMonth() === new Date(selfEvaluation.month).getMonth()) {
          ctx.status = 409;
          handleError({ctx, message: '该月已存在自评!'});
          return;
        }
      }
    }

    console.log(body);
    const selfEvaluation = new SelfEvaluationModel(body);
    await selfEvaluation
      .save()
      .catch(err => {
        console.log(err);
        ctx.throw(500, '保存数据库时出错');
      });

    handleSuccess({ctx, message: '创建成功'})
  }
}
