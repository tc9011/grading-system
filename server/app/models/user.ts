import * as mongoose from 'mongoose';
import { UserSchema } from '../schemas/user';

export const User = mongoose.model('User', UserSchema);

