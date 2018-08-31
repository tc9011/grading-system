import * as Router from 'koa-router';
import { SelfEvaluationCtrl } from '../app/controllers/self-evaluation';

const router = new Router();
const selfEvaluationCtrl = new SelfEvaluationCtrl();

router
  .post('/', selfEvaluationCtrl.save)
  .get('/:id', selfEvaluationCtrl.getByWorkNumber);

export { router as selfEvaluationRouter };

