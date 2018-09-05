import * as path from 'path';
import * as mongoose from 'mongoose';

import * as Koa from 'koa';
import * as kcors from 'kcors'
import * as serveStatic from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger'
import * as jwt from 'koa-jwt'

import { DBURL, Port, Secret } from './config/config';
import { router } from './routers/routes';
import { errorHandle } from './middlewares/errorHandle';


(<any>mongoose).Promise = global.Promise;
mongoose.connect(DBURL, { useNewUrlParser: true })
  .then(db => {
    console.log('Connected to MongoDB');

    const app = new Koa();

    app.use(logger());

    // koa-jwt errors handle
    app.use(errorHandle);

    app.use(jwt({
      secret: Secret
    }).unless({
      path: [/\/register/, /\/login/, /\/groups/],
    }));

    app.use(bodyParser());

    app.use(kcors());

    app.use(serveStatic(path.join(__dirname, '../grading-system')));

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(Port);

    console.log(`server listen at ${Port}`);
  })
  .catch(err => console.error(err));


