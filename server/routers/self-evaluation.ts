import * as Router from 'koa-router';
import { SelfEvaluationCtrl } from '../app/controllers/self-evaluation';

const router = new Router();
const selfEvaluationCtrl = new SelfEvaluationCtrl();

router
  .post('/', selfEvaluationCtrl.save)
  .get('/:workNumber', selfEvaluationCtrl.getByWorkNumber)
  .post('/:workNumber/batch', selfEvaluationCtrl.delteByMonth);

export { router as selfEvaluationRouter };

