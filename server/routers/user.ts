import * as Router from 'koa-router';

import { UserCtrl } from '../app/controllers/user';
import { isAdmin } from '../middlewares/isAdmin';

const router = new Router();
const userCtrl = new UserCtrl();

router.use(['/groups'], isAdmin());

router
  .post('/register', userCtrl.register)
  .post('/login', userCtrl.login)
  .put('/modifypassword', userCtrl.modifyPassword)
  .get('/groups', userCtrl.getGroups);

export { router as userRouter };
