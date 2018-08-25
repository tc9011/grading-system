import * as path from 'path';
import * as mongoose from 'mongoose';

import * as Koa from 'koa';
import * as kcors from 'kcors'
import * as serveStatic from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger'

import { router } from './routers/routes';

const dbURL = 'mongodb://localhost/gradingSystem';
const port = process.env.PORT || 3000;


(<any>mongoose).Promise = global.Promise;
mongoose.connect(dbURL, { useNewUrlParser: true })
  .then(db => {
    console.log('Connected to MongoDB');

    const app = new Koa();

    app.use(kcors());

    app.use(logger());

    app.use(bodyParser());

    app.use(serveStatic(path.join(__dirname, '../grading-system')));

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(port);

    console.log(`server listen at ${port}`);
  })
  .catch(err => console.error(err));


