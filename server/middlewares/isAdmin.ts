import { Context } from 'koa';
import * as jsonwebtoken from 'jsonwebtoken';
import * as Router from 'koa-router';

import { Secret } from '../config/config';
import { handleError } from '../utils/handle';

const router = new Router();
export function isAdmin() {
  return async function isAdmin (ctx: Context, next: any) {
    console.log(ctx.url);
    if (ctx.url.includes('passport')) {
      await next();
    } else {
      const token = ctx.request.header.authorization.split(' ')[1];
      var decoded = jsonwebtoken.verify(token, Secret);
      console.log(decoded.user.role);
      if (decoded.user.role < 10) {
        ctx.status = 401;
        handleError({ctx, message: '没有权限'});
        return;
      }
    }
  };

}
