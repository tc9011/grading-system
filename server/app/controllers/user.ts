import { Context } from 'koa';

import * as jsonwebtoken from 'jsonwebtoken';

import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';
import { Secret } from '../../config/config';

export class UserCtrl {
  public model = UserModel;

  public static async login(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber, password} = userBody;
    let user: any;

    try {
      user = await UserModel.findOne({workNumber: workNumber});
    } catch (e) {
      console.log(e);
      ctx.throw(500, '查找数据时出错!');
    }

    // console.log(user);
    if (!user) {
      ctx.status = 400;
      handleError({ctx, message: '帐号或密码错误!'});
      return;
    }

    // console.log(user);
    try {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        // 生成 token 返回给客户端
        const token = jsonwebtoken.sign({
          user: {
            workNumber: user.workNumber,
            group: user.group,
            role: user.role
          },

          // 设置 token 过期时间
          exp: Math.floor(Date.now() / 1000) + (60 * 60),   // 1小时
        }, Secret);

        handleSuccess({
          ctx,
          message: '登陆成功!',
          response: {
            token,
            lifeTime: Math.floor(Date.now() / 1000) + (60 * 60)
          }
        });
      } else {
        ctx.status = 400;
        handleError({ctx, message: '帐号或密码错误!'});
      }
    } catch (e) {
      console.log(e);
      ctx.throw(500, '比较密码时出错!');
    }

  }

  public static async register(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber} = userBody;
    let user: any;

    try {
      user = await UserModel.find({workNumber: workNumber});
    } catch (e) {
      console.log(e);
      ctx.throw(500, '查找数据时出错!');
    }

    if (user.length) {
      ctx.status = 409;
      handleError({ctx, message: '用户名已存在!'});
    } else {
      const user = new UserModel(userBody);

      try {
        await user.save();
      } catch (e) {
        console.log(e);
        ctx.throw(500, '保存数据库时出错');
      }

      handleSuccess({ctx, message: '创建成功!'});
    }
  }

}
