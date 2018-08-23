import { Document, Model, model } from 'mongoose';
import { UserSchema } from '../schemas/user';

export interface User extends Document {
  workNumber: string;
  password: string;
  role: number;
  meta: any;
}

export const UserModel: Model<User> = model<User>('User', UserSchema);

