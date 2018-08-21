import * as router from 'koa-router';
import { UserCtrl } from '../app/controllers/user';

export function routes (app) {
  const userCtrl = new UserCtrl();

  router.post('/passport/register', userCtrl)
}
