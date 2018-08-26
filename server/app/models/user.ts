import { Document, Model, model } from 'mongoose';

import { UserSchema } from '../schemas/user';

export interface User extends Document {
  workNumber: string;
  password: string;
  role: number;
  group: string;
  meta: any;
}

export const UserModel: Model<User> = model<User>('User', UserSchema);

