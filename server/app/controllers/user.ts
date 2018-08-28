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

    user = await UserModel
      .findOne({workNumber: workNumber})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    if (!user) {
      ctx.status = 400;
      handleError({ctx, message: '帐号或密码错误!'});
      return;
    }

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
    const {workNumber, password, role, group} = userBody;
    let user: any;

    // region: user parameter check
    const reg = /^\d{8}$/;
    if (!reg.test(workNumber)) {
      handleError({ctx, message: '工号须为8位数字!'});
      return;
    }

    if (password.length < 6) {
      handleError({ctx, message: '密码不够安全!'});
      return;
    }

    if (Object.prototype.toString.call(role) !== '[object Number]') {
      handleError({ctx, message: '角色类型错误'});
      return;
    }
    // endregion

    user = await UserModel
      .find({workNumber: workNumber})
      .catch(err => {
        console.log(err);
        ctx.throw(500, '查找数据时出错!');
      });

    if (user.length) {
      ctx.status = 409;
      handleError({ctx, message: '用户名已存在!'});
    } else {
      const user = new UserModel(userBody);

      await user
        .save()
        .catch(err => {
          console.log(err);
          ctx.throw(500, '保存数据库时出错');
        });

      handleSuccess({ctx, message: '创建成功!'});
    }
  }

}
