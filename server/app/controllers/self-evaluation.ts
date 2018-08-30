import { Context } from 'koa';

import { SelfEvaluationModel } from '../models/self-evaluation';
import { Base } from '../models/base';
import { handleSuccess } from '../../utils/handle';

export class SelfEvaluationCtrl extends Base{
  model = SelfEvaluationModel;

  async save (ctx: Context) {
    console.log(ctx.request.body);
    const body: any = ctx.request.body;
    const {workNumber, month, achievement, share, contribution} = body;
    handleSuccess({ctx, message: 'ok'})
  }
}
