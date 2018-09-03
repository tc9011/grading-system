import * as Router from 'koa-router';

import { userRouter } from './user';
import { APIPrefix } from '../config/config';
import { selfEvaluationRouter } from './self-evaluation';
import { mutualEvaluationStatusRouter } from './mutual-evaluation-status';
import { mutualEvaluationRouter } from './mutual-evaluation';
import { peopleManageRouter } from './people-manage';
import { selfSummaryRouter } from './self-summary';

const router = new Router({
  prefix: APIPrefix
});

router.use('/passport', userRouter.routes(), userRouter.allowedMethods());
router.use('/self', selfEvaluationRouter.routes(), selfEvaluationRouter.allowedMethods());
router.use('/mutual', mutualEvaluationRouter.routes(), mutualEvaluationRouter.allowedMethods());
router.use('/mutual/status', mutualEvaluationStatusRouter.routes(), mutualEvaluationStatusRouter.allowedMethods());
router.use('/peoplemanage', peopleManageRouter.routes(), peopleManageRouter.allowedMethods());
router.use('/selfsummary', selfSummaryRouter.routes(), selfSummaryRouter.allowedMethods());

export { router };
