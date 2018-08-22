import * as Router from 'koa-router';
import { UserCtrl } from '../app/controllers/user';

const router = new Router();
const userCtrl = new UserCtrl();

router
  .get('/passport/register', userCtrl.login);

export { router as userRouter }
