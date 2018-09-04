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

    const allStatus: any = await MutualEvaluationStatusModel
      .find({owner: workNumber, month: month})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    // 查user表中同组人员
    const users: any = await UserModel
      .find({group: group})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });


    for (const user of users) {
      // users中剔除登录者和管理员的信息
      if (user.workNumber !== workNumber && user.role < 10) {
        // 是否已存在指定月份和工号的数据，如果没有就新建一个
        const status = await MutualEvaluationStatusModel
          .findOne({owner: workNumber, workNumber: user.workNumber, month: month})
          .catch(err => {
            console.log(err);
            ctx.throw(500, '查找数据时出错!');
          });

        if (!status) {
          const date = new Date(month ? month : Date.now());
          const newMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
          const newStatus = {
            owner: workNumber,
            month: newMonth,
            workNumber: user.workNumber,
            realName: user.realName,
            group: user.group,
            role: user.role,
            status: false,    // 登录者对该对象的互评完成的状态
          };
          allStatus.push(newStatus);
        }
      }
    }


    handleSuccess({ctx, message: undefined, response: allStatus});
  }
}
