import * as Router from 'koa-router';

import { userRouter } from './user';
import { APIPrefix } from '../config/config';
import { selfEvaluationRouter } from './self-evaluation';

const router = new Router({
  prefix: APIPrefix
});

router.use('/passport', userRouter.routes(), userRouter.allowedMethods());
router.use('/self', selfEvaluationRouter.routes(), selfEvaluationRouter.allowedMethods());

export { router };
