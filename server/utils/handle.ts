import { Context } from 'koa';

export interface HandleParams {
  ctx: Context;
  message: string;
  err?: any;
  result?: any;
}

export const handleError = (
  { ctx, message = '请求失败', err = '' }: HandleParams
) => {
  ctx.body = { code: 0, message, debug: err };
};

export const handleSuccess = (
  { ctx, message = '请求成功', result = '' }: HandleParams
) => {
  ctx.response.body = { code: 1, message, result };
};
