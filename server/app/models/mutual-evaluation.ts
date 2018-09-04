import { prop, Typegoose } from 'typegoose';

class MutualEvaluationSchema extends Typegoose {
  @prop({required: true})
  owner: string;

  @prop({required: true})
  ownerRealName: string;

  @prop({required: true})
  month: string;

  @prop({required: true})
  workNumber: string;         // 登陆者互评对象的工号

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
  role: number;       // owner的role

  @prop({
    required: true,
    default: false,
  })
  status: boolean;    // 互评的状态

  @prop({
    default: '',
  })
  mutualAchievement: string;

  @prop({
    required: true,
    default: 0,
  })
  achievementRate: number;

  @prop({
    default: '',
  })
  mutualShare: string;

  @prop({
    required: true,
    default: 0,
  })
  shareRate: number;

  @prop({
    default: '',
  })
  mutualContribution: string;

  @prop({
    required: true,
    default: 0,
  })
  contributionRate: number;
}

export const MutualEvaluationModel = new MutualEvaluationSchema().getModelForClass(MutualEvaluationSchema);
