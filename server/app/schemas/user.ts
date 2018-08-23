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

UserSchema.pre('save', function (next) {
  console.log(this);
  const user: User = <User>this;

  if (this.isNew) {
    user.meta.createAt = user.meta.updateAt = Date.now();
  } else {
    user.meta.updateAt = Date.now();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });

});

UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }

      cb(null, isMatch);
    });
  },
};

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },

  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  },
};

export { UserSchema };

