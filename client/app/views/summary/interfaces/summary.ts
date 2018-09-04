export interface MutualSummaryData {
  workNumber: string;
  group: string;
  realName: string;
  score: number;
  status: boolean;
  month: string;
  project: string;
}

export interface MutualSummaryParameter {
  group: string;
  month: string;
}

export interface DetailPostData {
  workNumber: string;
  group: string;
  month: string;
  filter: string;
}
