import { pre, prop, Typegoose } from 'typegoose';

@pre<SelfEvaluationSchema>('save', async function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }

  next();
})
class SelfEvaluationSchema extends Typegoose {
  @prop({
    required: true,
    unique: true,
  })
  month: string;

  @prop({required: true})
  workNumber: string;

  @prop({required: true})
  achievement: string;

  @prop({required: true})
  share: string;

  @prop({required: true})
  contribution: string;

  @prop({ default: Date.now() })
  createAt: any;

  @prop({ default: Date.now() })
  updateAt: any;
}

export const SelfEvaluationModel = new SelfEvaluationSchema().getModelForClass(SelfEvaluationSchema);
