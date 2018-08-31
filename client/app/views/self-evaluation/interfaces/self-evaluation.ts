export interface SelfEvaluation {
  workNumber: string;
  month: Date;
  achievement: string;
  share: string;
  contribution: string;
  _id?: string;
  __v?: number;
  updateAt?: number;
  createAt?: number;
}

export interface DisplayTableData {
  month: string;
  achievement: string;
  share: string;
  contribution: string;
  checked: boolean;
}
