import { Context } from 'koa';
import { UserModel } from '../models/user';

export class UserCtrl {
  private static model = UserModel;

  public static login(ctx: Context) {
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

  public static register(ctx: Context) {
    const _workNumber: string = ctx.body.workNumber;

    this.model.find({workNumber: _workNumber}, function (err, user) {
      if (err) {
        return console.log(err);
      }

      if (user.length) {

      }
    });
    ctx.body = 'Hello Koa';
  }

}
