import { User } from '../models/user';
import BaseCtrl from './base';

export class UserCtrl extends BaseCtrl{
  model = User;

  login = (ctx) => {
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
}
