import { Context } from 'koa';
import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';

export class UserCtrl {
  public model = UserModel;

  public static async login(ctx: Context) {
    /*this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });*/
    ctx.body = 'Hello Koa';
  }

  public static async register(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber, password, role, group} = userBody;

    console.log(userBody);
    console.log(workNumber);
    const user = await UserModel.find({name: workNumber}).catch(err => ctx.throw(500, '查找数据时出错!'));
    console.log(user);
    if (user.length) {
      console.log(user.length);
      handleError({ctx, message: '用户名已存在!'});
    } else {
      const user = new UserModel(userBody);
      console.log('new user:');
      console.log(user);
      await user.save().catch(err => ctx.throw(500, '保存数据库时出错'));
      console.log('ok?');
      handleSuccess({ctx, message: '创建成功!'});
    }
  }

}
