import * as Router from 'koa-router';

import { SelfSummaryCtrl } from '../app/controllers/self-summary';

const router = new Router();
const selfSummaryCtrl = new SelfSummaryCtrl();

router
  .get('/group/:group/year/:year/month/:month', selfSummaryCtrl.getAllSelfEvaluationInfo)

export { router as selfSummaryRouter };


