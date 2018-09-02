import { prop, Typegoose } from 'typegoose';

class MutualEvaluationStatusSchema extends Typegoose {
  @prop({required: true})
  month: string;

  @prop({required: true})
  workNumber: string;

  @prop({required: true})
  realName: string;

  @prop({required: true})
  group: string;

  // 0: normal user
  // 1: verified user
  // 2: professional user
  // >10: admin
  // >50: super admin
  @prop({
    required: true,
    default: 0,
  })
  role: number;

  @prop({
    required: true,
    default: false,
  })
  status: boolean;
}

export const MutualEvaluationStatusModel = new MutualEvaluationStatusSchema().getModelForClass(MutualEvaluationStatusSchema);

