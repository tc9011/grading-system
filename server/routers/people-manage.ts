import * as Router from 'koa-router';

import { PeopleManageCtrl } from '../app/controllers/people-manage';
import { isAdmin } from '../middlewares/isAdmin';

const router = new Router();
const peopleManageCtrl = new PeopleManageCtrl();

router.use(isAdmin());

router
  .get('/group/:group', peopleManageCtrl.getAllGroupUsers)
  .post('/batch', peopleManageCtrl.delteUsers);

export { router as peopleManageRouter };
