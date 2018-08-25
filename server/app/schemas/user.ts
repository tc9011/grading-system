import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';

const SALT_WORK_FACTOR = 10;

const UserSchema: Schema = new Schema({
  workNumber: {
    unique: true,
    type: String,
  },

  password: String,

  // 0: normal user
  // 1: verified user
  // 2: professional user
  // >10: admin
  // >50: super admin
  role: {
    type: String,
    default: 0,
  },

  group: {
    type: String,
  },

  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

UserSchema.pre('save', async function (next) {
  console.log(this);
  const user: User = <User>this;

  if (this.isNew) {
    user.meta.createAt = user.meta.updateAt = Date.now();
  } else {
    user.meta.updateAt = Date.now();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR).catch(err => console.log(err));

  user.password = await bcrypt.hash(user.password, salt).catch(err => console.log(err));

  next();
});

UserSchema.methods = {
  comparePassword: async function (_password) {
    return await bcrypt.compare(_password, this.password).catch(err => console.log(err));
  },
};

UserSchema.statics = {
  fetch: async function () {
    return await this
      .find({})
      .sort('meta.updateAt');
  },

  findById: async function (id) {
    return await this
      .findOne({_id: id});
  },
};

export { UserSchema };

