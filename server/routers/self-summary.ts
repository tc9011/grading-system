import * as Router from 'koa-router';

import { SelfSummaryCtrl } from '../app/controllers/self-summary';
import { isAdmin } from '../middlewares/isAdmin';

const router = new Router();
const selfSummaryCtrl = new SelfSummaryCtrl();

router.use(isAdmin());

router
  .get('/workNumber/:workNumber/group/:group/year/:year/month/:month', selfSummaryCtrl.getAllSelfEvaluationInfo);

export { router as selfSummaryRouter };


