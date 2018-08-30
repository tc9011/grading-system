import { UserSchema } from '../schemas/user';

export const UserModel = new UserSchema().getModelForClass(UserSchema);
