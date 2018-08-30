import { handleSuccess } from '../../utils/handle';

export abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = async (ctx) => {
    const docs = await this.model
      .find({})
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'getAll出错');
      });
    handleSuccess({ctx, message: undefined, response: docs});
  };

  // Count all
  count = async (ctx) => {
    const count = await this.model
      .count()
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'count出错');
      });
    handleSuccess({ctx, message: undefined, response: count});
  };

  // Insert
  insert = async (ctx) => {
    const obj = new this.model(ctx.request.body);
    const item = await obj
      .save()
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'insert出错');
      });
    handleSuccess({ctx, message: undefined, response: item});
  };

  // Get by id
  get = async (ctx) => {
    const item = await this.model
      .findOne({ _id: ctx.params.id })
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined, response: item});
  };

  // Update by id
  update = async (ctx) => {
    await this.model
      .findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined});
  };

  // Delete by id
  delete = async (ctx) => {
    this.model
      .findOneAndRemove({ _id: ctx.params.id })
      .catch(err => {
        console.log(err);
        ctx.throw(500, 'get出错');
      });
    handleSuccess({ctx, message: undefined});
  };
}
