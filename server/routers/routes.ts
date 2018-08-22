import * as Router from 'koa-router';
import { userRouter } from './user';

const router = new Router({
  prefix: '/api'
});

router.use('/', userRouter.routes(), userRouter.allowedMethods());

export { router };
