import * as bcrypt from 'bcryptjs';
import { pre, prop, Typegoose, instanceMethod } from 'typegoose';

const SALT_WORK_FACTOR = 10;

@pre<SelfEvaluationSchema>('save', async function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.salt = salt;
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err);
  }

  next();
})
class SelfEvaluationSchema extends Typegoose {
  @prop({
    required: true,
    unique: true
  })
  workNumber: string;

  @prop({required: true})
  date: Date;

  @prop({required: true})
  achievement: string;

  @prop({required: true})
  share: string;

  @prop()
  contribution: string;

  @prop({ default: Date.now() })
  createAt: any;

  @prop({ default: Date.now() })
  updateAt: any;

  @instanceMethod
  async comparePassword(_password) {
    return await bcrypt
      .compare(_password, this.password)
      .catch(err => console.log(err));
  }
}

export const SelfEvaluationModel = new SelfEvaluationSchema().getModelForClass(SelfEvaluationSchema);
