import * as Router from 'koa-router';

import { UserCtrl } from '../app/controllers/user';

const router = new Router();
const userCtrl = new UserCtrl();

router
  .post('/register', userCtrl.register)
  .post('/login', userCtrl.login)
  .put('/modifypassword', userCtrl.modifyPassword);

export { router as userRouter };
