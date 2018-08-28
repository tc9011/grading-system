import { Context } from 'koa';

export interface HandleParams {
  ctx: Context;
  message: string;
  err?: any;
  response?: any;
}

export const handleError = (
  { ctx, message = '请求失败', err = '' }: HandleParams
) => {
  ctx.body = { status: 1, message, debug: err };
};

export const handleSuccess = (
  { ctx, message = '请求成功', response = '' }: HandleParams
) => {
  ctx.response.body = { status: 0, message, response };
};
