import { Context } from 'koa';
import * as jsonwebtoken from 'jsonwebtoken';

import { Secret } from '../config/config';
import { handleError } from '../utils/handle';

export const isAdmin = () => {
  return async (ctx: Context, next: any) => {
    const token = ctx.request.header.authorization.split(' ')[1];
    const decoded = jsonwebtoken.verify(token, Secret);
    if (decoded.user.role < 10) {
      ctx.status = 401;
      handleError({ctx, message: '没有权限'});
    } else {
      await next();
    }
  };
};
