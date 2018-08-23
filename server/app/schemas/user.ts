import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
    type: Number,
    default: 0,
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
  const user: any = this;

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
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
      console.log(user);
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

