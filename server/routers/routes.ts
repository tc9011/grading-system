import * as Router from 'koa-router';

import { userRouter } from './user';
import { APIPrefix } from '../config/config';
import { selfEvaluationRouter } from './self-evaluation';
import { mutualEvaluationStatusRouter } from './mutual-evaluation-status';

const router = new Router({
  prefix: APIPrefix
});

router.use('/passport', userRouter.routes(), userRouter.allowedMethods());
router.use('/self', selfEvaluationRouter.routes(), selfEvaluationRouter.allowedMethods());
router.use('/mutual/status', mutualEvaluationStatusRouter.routes(), mutualEvaluationStatusRouter.allowedMethods());

export { router };
