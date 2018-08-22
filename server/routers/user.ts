import * as Router from 'koa-router';
import { UserCtrl } from '../app/controllers/user';

const router = new Router({
  prefix: '/passport'
});
const userCtrl = new UserCtrl();

router
  .get('/register', userCtrl.login);

export { router as userRouter }
