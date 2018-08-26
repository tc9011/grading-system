import * as Router from 'koa-router';

import { UserCtrl } from '../app/controllers/user';

const router = new Router();

router
  .post('/passport/register', UserCtrl.register)
  .post('/passport/login', UserCtrl.login);

export { router as userRouter };
