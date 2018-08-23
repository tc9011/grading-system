import * as Router from 'koa-router';
import { UserCtrl } from '../app/controllers/user';

const router = new Router();

router
  .post('/passport/register', UserCtrl.register);

export { router as userRouter };
