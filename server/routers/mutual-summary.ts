import * as Router from 'koa-router';

import { MutualSummaryCtrl } from '../app/controllers/mutual-summary';

const router = new Router();
const mutualSummaryCtrl = new MutualSummaryCtrl();

router
  .get('/group/:group/year/:year/month/:month', mutualSummaryCtrl.getProgress)
  .post('/filter/:filter', mutualSummaryCtrl.getTargetMutualSummary);

export { router as mutualSummaryRouter };

