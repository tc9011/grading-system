import { Context } from 'koa';

import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';

export class PeopleManageCtrl extends BaseCtrl {
  model = UserModel;

  public async getAllGroupUsers(ctx: Context) {
    console.log('ok');
    const group = ctx.params.group;

    console.log(group);
    const users = await UserModel
      .find({group: group})
      .catch(err => {
        console.log(err);
        handleError({ctx, message: '查找失败!', err: err});
      });

    console.log(users);
    handleSuccess({ctx, message: undefined, response: users});
  }
}
