import * as Router from 'koa-router';

import { userRouter } from './user';

const router = new Router();

router.use('/api', userRouter.routes(), userRouter.allowedMethods());

export { router };
