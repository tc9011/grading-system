import { Context } from 'koa';

import { BaseCtrl } from './base';
import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';
import { UserModel } from '../models/user';
import { handleSuccess } from '../../utils/handle';
import { SelfEvaluationModel } from '../models/self-evaluation';

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
          // 查询自评表中是否存在自评（防止MutualEvaluationStatusModel没有数据，一直返回false）
          const selfEvaluation: any = await SelfEvaluationModel
            .find({owner: workNumber, workNumber: user.workNumber, month: month})
            .catch(err => {
              console.log(err);
              ctx.throw(500, '查找数据时出错!');
            });

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
          if (selfEvaluation.length && selfEvaluation[0].share && selfEvaluation[0].achievement && selfEvaluation[0].contribution) {
            // 如果存在, status 为 true，并save和push到数组
            newStatus.status = true;
            const mutualEvaluationStatus = new MutualEvaluationStatusModel(newStatus);
            await mutualEvaluationStatus
              .save()
              .catch(err => {
                console.log(err);
                ctx.throw(500, 'save出错');
              });
          }
          allStatus.push(newStatus);
        }
      }
    }


    handleSuccess({ctx, message: undefined, response: allStatus});
  }
}
