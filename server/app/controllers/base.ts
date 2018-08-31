import { handleSuccess } from '../../utils/handle';
import { Context } from 'koa';

export abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = async (ctx: Context) => {
    const docs = await this.model
      .find({})
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'getAll出错');
      });
    handleSuccess({ctx, message: undefined, response: docs});
  };

  // Count all
  count = async (ctx: Context) => {
    const count = await this.model
      .count()
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'count出错');
      });
    handleSuccess({ctx, message: undefined, response: count});
  };

  // Insert
  insert = async (ctx: Context) => {
    const obj = new this.model(ctx.request.body);
    const item = await obj
      .save()
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'insert出错');
      });
    handleSuccess({ctx, message: undefined, response: item});
  };

  // Get by workNumber
  getByWorkNumber = async (ctx: Context) => {
    const item = await this.model
      .find({ workNumber: ctx.params.workNumber })
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined, response: item});
  };

  // Update by id
  update = async (ctx: Context) => {
    await this.model
      .findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined});
  };

  // Delete by id
  delete = async (ctx: Context) => {
    this.model
      .findOneAndRemove({ _id: ctx.params.id })
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: '删除成功!'});
  };
}
