// Custom 401 handling if you don't want to expose koa-jwt errors to users
export const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
};
