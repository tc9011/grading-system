import * as Router from 'koa-router';
import { SelfEvaluationCtrl } from '../app/controllers/self-evaluation';

const router = new Router();
const selfEvaluationCtrl = new SelfEvaluationCtrl();

router
  .post('/', selfEvaluationCtrl.save)
  .post('/workNumber/:workNumber/batch', selfEvaluationCtrl.delteByMonth)
  .post('/monthInfo', selfEvaluationCtrl.getByMonth)
  .get('/workNumber/:workNumber', selfEvaluationCtrl.getByWorkNumber);

export { router as selfEvaluationRouter };

