import { Context } from 'koa';
import * as jsonwebtoken from 'jsonwebtoken';

import { Secret } from '../config/config';
import { handleError } from '../utils/handle';

export const isAdmin = (ctx: Context, next: any) => {
  console.log(ctx.url);
  if (ctx.url.includes('passport')) {
    next();
  } else {
    const token = ctx.request.header.authorization.split(' ')[1];
    const decoded = jsonwebtoken.verify(token, Secret);
    console.log(decoded.user.role);
    if (decoded.user.role < 10) {
      ctx.status = 401;
      handleError({ctx, message: '没有权限'});
    }
  }
};
