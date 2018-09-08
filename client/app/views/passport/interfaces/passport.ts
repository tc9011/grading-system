export class User {
  workNumber: string;
  realName: string;
  password: string;
  confirm?: string;
  group: string;
  role: number;
}

export interface LoginInfo {
  workNumber: string;
  password: string;
}

export interface ModifyPasswordInfo {
  workNumber: string;
  oldPassword: string;
  password: string;
  confirm: string;
}

export interface LoginRes {
  lifeTime: number;
  token: string;
}
