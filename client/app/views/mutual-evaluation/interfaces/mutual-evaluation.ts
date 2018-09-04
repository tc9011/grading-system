import { prop } from 'typegoose';

export interface InfoForGetStatus {
  workNumber: string;
  group: string;
  month: string;
}

export interface Status {
  owner: string;
  statusId: string;
  month: string;
  workNumber: string;
  realName: string;
  group: string;
  role: number;
  status: boolean,
}

export interface InfoForGetMutualEvaluation {
  owner: string;
  workNumber: string;
  group: string;
  month: string;
}

export interface GetMutualEvaluation {
  selfAchievement: string;
  selfShare: string;
  selfContribution: string;
  mutualAchievement: string;
  achievementRate: number;
  mutualShare: string;
  shareRate: number;
  mutualContribution: string;
  contributionRate: number;
}

export interface MutualEvaluation {
  owner: string;
  ownerRealName: string;
  month: string;
  workNumber: string;
  realName: string;
  group: string;
  role: number;
  status: boolean;
  mutualAchievement: string;
  achievementRate: number;
  mutualShare: string;
  shareRate: number;
  mutualContribution: string;
  contributionRate: number;
}
