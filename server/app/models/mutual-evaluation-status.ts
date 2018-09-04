import { prop, Typegoose } from 'typegoose';

class MutualEvaluationStatusSchema extends Typegoose {
  @prop({required: true})
  owner: string;

  @prop({required: true})
  month: string;

  @prop({required: true})
  workNumber: string;       // 登陆者互评对象的工号，下同

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
  status: boolean;      // 登录者对该对象的互评完成的状态
}

export const MutualEvaluationStatusModel = new MutualEvaluationStatusSchema().getModelForClass(MutualEvaluationStatusSchema);

