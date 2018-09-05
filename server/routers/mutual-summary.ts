import * as Router from 'koa-router';

import { MutualSummaryCtrl } from '../app/controllers/mutual-summary';
import { isAdmin } from '../middlewares/isAdmin';

const router = new Router();
const mutualSummaryCtrl = new MutualSummaryCtrl();

router.use(isAdmin());

router
  .get('/group/:group/year/:year/month/:month', mutualSummaryCtrl.getProgress)
  .post('/filter/:filter', mutualSummaryCtrl.getTargetMutualSummary)
  .post('/details', mutualSummaryCtrl.getMutualOfTarget);

export { router as mutualSummaryRouter };

