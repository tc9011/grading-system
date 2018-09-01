import * as Router from 'koa-router';
import { MutualEvaluationStatusCtrl } from '../app/controllers/mutual-evaluation-status';

const router = new Router();
const mutualEvaluationStatusCtrl = new MutualEvaluationStatusCtrl();

router
  .post('/', mutualEvaluationStatusCtrl.getStatus);

export { router as mutualEvaluationStatusRouter };
