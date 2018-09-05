import * as Router from 'koa-router';

import { CollectCtrl } from '../app/controllers/collect';

const router = new Router();
const collectCtrl = new CollectCtrl();

router
  .post('/', collectCtrl.getCollectByMonth);

export { router as CollectRouter };
