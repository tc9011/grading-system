import { Context } from 'koa';

import { SelfEvaluationModel } from '../models/self-evaluation';
import { handleError, handleSuccess } from '../../utils/handle';
import { BaseCtrl } from './base';

export class SelfEvaluationCtrl extends BaseCtrl {
  model = SelfEvaluationModel;

  async save(ctx: Context) {
    const body: any = ctx.request.body;
    const {workNumber, month} = body;

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

    if (selfEvaluations.length) {
      for (const selfEvaluation of selfEvaluations) {
        if (new Date(month).getMonth() === new Date(selfEvaluation.month).getMonth()) {
          ctx.status = 409;
          handleError({ctx, message: '该月已存在自评!'});
          return;
        }
      }
    }

    const selfEvaluation = new SelfEvaluationModel(body);
    await selfEvaluation
      .save()
      .catch(err => {
        console.log(err);
        ctx.throw(500, '保存数据库时出错');
      });

    handleSuccess({ctx, message: '创建成功'});
  }

  async delteByMonth(ctx: Context) {
    const body: any = ctx.request.body;
    const workNumber = ctx.params.workNumber;

    for (const month of body) {
      await SelfEvaluationModel
        .findOneAndRemove({ workNumber: workNumber, month: month })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });
    }

    handleSuccess({ctx, message: '删除成功!'});
  }
}
