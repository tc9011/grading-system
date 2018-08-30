import { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

export interface SelfEvaluation extends Document {
  workNumber: string;
  data: Date;
  achievement: string;
  share: string;
  contribution: string;
  meta: any;
}

const SelfEvaluationSchema: Schema = new Schema({
  workNumber: {
    unique: true,
    type: String,
  },

  data: Date,

  achievement: String,

  share: String,

  contribution: String,

  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

SelfEvaluationSchema.pre('save', async function (next) {
  const selfEvaluation: SelfEvaluation = <SelfEvaluation>this;

  if (this.isNew) {
    selfEvaluation.meta.createAt = selfEvaluation.meta.updateAt = Date.now();
  } else {
    selfEvaluation.meta.updateAt = Date.now();
  }

  /*try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    selfEvaluation.password = await bcrypt.hash(selfEvaluation.password, salt);
  } catch (err) {
    console.log(err);
  }*/

  next();
});

SelfEvaluationSchema.methods = {
  comparePassword: async function (_password) {
    return await bcrypt
      .compare(_password, this.password)
      .catch(err => console.log(err));
  },
};

SelfEvaluationSchema.statics = {
  fetch: async function () {
    return await this
      .find({})
      .sort('meta.updateAt');
  },

  findById: async function (id) {
    return await this
      .findOne({_id: id});
  },
};

export { SelfEvaluationSchema };

