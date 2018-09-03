import { Context } from 'koa';

import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';
import { MutualEvaluationModel } from '../models/mutual-evaluation';
import { SelfEvaluationModel } from '../models/self-evaluation';
import { MutualEvaluationStatusModel } from '../models/mutual-evaluation-status';

export class PeopleManageCtrl extends BaseCtrl {
  model = UserModel;

  public async getAllGroupUsers(ctx: Context) {
    const group = ctx.params.group;

    const users: any = await UserModel
      .find({group: group})
      .catch(err => {
        console.log(err);
        handleError({ctx, message: '查找失败!', err: err});
      });

    const tempUsers = [];
    for (const user of users) {
      const tempUser = {
        workNumber: user.workNumber,
        realName: user.realName,
        group: user.group,
        role: user.role,
      };
      tempUsers.push(tempUser);
    }
    handleSuccess({ctx, message: undefined, response: tempUsers});
  }

  public async delteUsers(ctx: Context) {
    const users: any = ctx.request.body;

    for (const user of users) {
      // 删除用户
      await UserModel
        .findOneAndRemove({ workNumber: user.workNumber, group: user.group })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 删除该用户自己的互评
      await MutualEvaluationModel
        .deleteMany({ owner: user.workNumber, group: user.group })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 删除对于该用户的互评
      await MutualEvaluationModel
        .deleteMany({ workNumber: user.workNumber, group: user.group })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 删除该用户自己的互评状态
      await MutualEvaluationStatusModel
        .deleteMany({ owner: user.workNumber, group: user.group })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 删除对该用户的互评状态
      await MutualEvaluationStatusModel
        .deleteMany({ workNumber: user.workNumber, group: user.group })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });

      // 删除该用户的自评
      await SelfEvaluationModel
        .deleteMany({ workNumber: user.workNumber })
        .catch(err => {
          console.log(err);
          handleError({ctx, message: '删除失败!', err: err});
        });
    }

    handleSuccess({ctx, message: '删除成功!'});
  }
}
