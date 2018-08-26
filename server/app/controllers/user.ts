import { Context } from 'koa';
import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';

export class UserCtrl {
  public model = UserModel;

  public static async login(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber, password} = userBody;
    let user: any;

    try {
      user = await UserModel.findOne({ workNumber: workNumber });
    } catch (e) {
      console.log(e);
      ctx.throw(500, '查找数据时出错!');
    }

    // console.log(user);
    if (!user) {
      ctx.status =400;
      handleError({ctx, message: '用户不存在!'});
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      // const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      // res.status(200).json({ token: token });
      handleSuccess({ctx, message: '登陆成功!'});
    } else {
      ctx.status =400;
      handleError({ctx, message: '密码错误!'});
    }
  }

  public static async register(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber} = userBody;
    let user: any;

    try {
      user = await UserModel.find({workNumber: workNumber})
    } catch (e) {
      console.log(e);
      ctx.throw(500, '查找数据时出错!');
    }

    // console.log(user);
    if (user.length) {
      ctx.status = 409;
      handleError({ctx, message: '用户名已存在!'});
    } else {
      const user = new UserModel(userBody);
      // console.log('new user:');
      // console.log(user);

      try {
        await user.save();
      } catch (e) {
        console.log(e);
        ctx.throw(500, '保存数据库时出错')
      }

      // console.log(user);
      handleSuccess({ctx, message: '创建成功!'});
    }
  }

}
