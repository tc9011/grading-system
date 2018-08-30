// Custom 401 handling if you don't want to expose koa-jwt errors to users
import { handleError } from '../utils/handle';

export const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      handleError({ctx, message: '登录过期，请重新登录', err: err.originalError ? err.originalError.message : err.message});
    } else {
      throw err;
    }
  });
};
