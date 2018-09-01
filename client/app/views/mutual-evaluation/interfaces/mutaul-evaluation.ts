export interface InfoForGetStatus {
  workNumber: string;
  group: string;
  month: string;
}

export interface Status {
  statusId: string;
  month: string;
  workNumber: string;
  realName: string;
  group: string;
  role: number;
  status: boolean,
}
