import * as Koa from 'koa';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as serveStatic from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import { routes } from './config/routes';

const app = new Koa();
const dbURL = 'mongodb://localhost/gradingSystem';
const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(serveStatic(path.join(__dirname, '../grading-system')));

mongoose.Promise = global.Promise;
mongoose.connect(dbURL)
  .then(db => {
    console.log('Connected to MongoDB');

    routes(app);

    app.listen(port);
  })
  .catch(err => console.error(err));


export { app };
