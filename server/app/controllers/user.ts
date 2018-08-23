import { Context } from 'koa';
import BaseCtrl from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';

export class UserCtrl extends BaseCtrl{
  public model = UserModel;

  public static login (ctx: Context) {
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

  public static register (ctx: Context) {
    const userBody: any = ctx.request.body;
    const { _workNumber, _password, _role, _group } = userBody;

    UserModel.find({name: _workNumber}, function (err, user) {
      if (err) {
        return console.log(err);
      }

      if (user.length) {
        ctx.state = 403;
        handleError({ ctx, message: "用户名已存在!" })
      } else {
        const user = new UserModel(userBody);
        user.save(function (err, user) {
          if (err) {
            console.log(err);
          }
          console.log('ok?');
          ctx.state = 200;
          handleSuccess({ ctx, message: "创建成果!" })
        })
      }
    });
  }

}
