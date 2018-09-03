import * as Router from 'koa-router';

import { PeopleManageCtrl } from '../app/controllers/people-manage';

const router = new Router();
const peopleManageCtrl = new PeopleManageCtrl();

router
  .get('/group/:group', peopleManageCtrl.getAllGroupUsers);

export { router as peopleManageRouter };
