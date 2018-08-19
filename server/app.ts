import * as Koa from 'koa';
import * as mongoose from 'mongoose';

const app = new Koa();
const dbURL = 'mongodb://localhost/gradingSystem';

mongoose.connect(dbURL);

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);

export { app };
