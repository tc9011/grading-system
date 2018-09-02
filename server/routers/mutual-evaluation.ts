import * as Router from 'koa-router';

import { MutualEvaluationCtrl } from '../app/controllers/mutual-evaluation';

const router = new Router();
const mutualEvaluationCtrl = new MutualEvaluationCtrl();

router
  .post('/getMutualEvaluation', mutualEvaluationCtrl.getMutualEvaluation)
  .post('/', mutualEvaluationCtrl.save);

export { router as mutualEvaluationRouter };
