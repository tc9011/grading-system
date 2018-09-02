import { Context } from 'koa';

import { SelfEvaluationModel } from '../models/self-evaluation';
import { handleError, handleSuccess } from '../../utils/handle';
import { BaseCtrl } from './base';

export class SelfEvaluationCtrl extends BaseCtrl {
  model = SelfEvaluationModel;

  public async save(ctx: Context) {
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
      const newDataArray = month.split('-');
      for (const selfEvaluation of selfEvaluations) {
        const oldDateArray = selfEvaluation.month.split('-');
        if (newDataArray[0] === oldDateArray[0] && newDataArray[1] === oldDateArray[1]) {
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

  public async delteByMonth(ctx: Context) {
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

  public async getByMonth(ctx: Context) {
    const body: any = ctx.request.body;

    const item = await SelfEvaluationModel
      .find({ workNumber: body.workNumber, month: body.month })
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined, response: item});
  }

  public async modify(ctx: Context) {
    const body: any = ctx.request.body;
    const {oldMonth, data} = body;
    const {workNumber, month}= data;

    // 新的月份和原月份不等时，先检查新月份在数据库中是否有重复，再删除数据库中老数据    // TODO 代码重复，记得重构
    if (oldMonth != month) {
      const selfEvaluations: any = await SelfEvaluationModel
        .find({workNumber: workNumber})
        .catch(err => {
          console.log(err);
          ctx.throw(500, '查找数据时出错!');
        });

      if (selfEvaluations.length) {
        const newDateArray = month.split('-');
        for (const selfEvaluation of selfEvaluations) {
          const oldDateArray = selfEvaluation.month.split('-');
          if (newDateArray[0] === oldDateArray[0] &&
            newDateArray[1] === oldDateArray[1]) {
            ctx.status = 409;
            handleError({ctx, message: '该月已存在自评!'});
            return;
          }
        }
      }

      // 删除老数据
      await SelfEvaluationModel
        .findOneAndRemove({ workNumber: workNumber, month: oldMonth })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 保存新数据
      const selfEvaluation = new SelfEvaluationModel(data);
      await selfEvaluation
        .save()
        .catch(err => {
          console.log(err);
          ctx.throw(500, '保存数据库时出错');
        });

      handleSuccess({ctx, message: '创建成功'});
    } else {
      // 更新
      await SelfEvaluationModel
        .findOneAndUpdate({ workNumber: data.workNumber, month: data.month }, data)
        .catch(err => {
          console.log(err);
          ctx.throw(500, 'get出错');
        });
      handleSuccess({ctx, message: undefined});
    }
  }
}
