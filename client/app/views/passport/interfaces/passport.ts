export class User {
  workNumber: string;
  password: string;
  confirm?: string;
  group: string;
  role: number;
}

export interface Login {
  workNumber: string;
  password: string;
}
