import { Context } from 'koa';

import { BaseCtrl } from './base';
import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';
import { UserModel } from '../models/user';
import { handleSuccess } from '../../utils/handle';

export class MutualEvaluationStatusCtrl extends BaseCtrl {
  model = MutualEvaluationStatusModel;

  public async getStatus(ctx: Context) {
    const body: any = ctx.request.body;
    const {workNumber, group, month} = body;    // 这里前端传过来的month不是Date，是类似'2018-9'的字符串

    // 查user表中同组人员
    const users: any = await UserModel
      .find({group: group})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    for (const user of users) {
      // 是否已存在指定月份和工号的数据，如果没有就新建一个
      const status = await MutualEvaluationStatusModel
        .findOne({workNumber: user.workNumber, month: month})
        .catch(err => {
          console.log(err);
          ctx.throw(500, '查找数据时出错!');
        });

      console.log(status);
      if (!status) {
        console.log('ok');
        const date = new Date(month ? month : Date.now());
        const newMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
        const newStatus = {
          month: newMonth,
          workNumber: user.workNumber,
          realName: user.realName,
          group: user.group,
          role: user.role,
          status: false,
        };
        const mutualEvaluationStatus = new MutualEvaluationStatusModel(newStatus);
        await mutualEvaluationStatus
          .save()
          .catch(err => {
            console.log(err);
            ctx.throw(500, '保存数据库时出错');
          });
      }
    }

    const allStatus = await MutualEvaluationStatusModel
      .find({month: month})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });
    handleSuccess({ctx, message: undefined, response: allStatus});
  }
}
