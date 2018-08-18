import * as Koa from 'koa';
import * as mongoose from 'mongoose';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
