import * as bcrypt from 'bcryptjs';
import { pre, prop, Typegoose, instanceMethod } from 'typegoose';

const SALT_WORK_FACTOR = 10;

@pre<UserSchema>('save', async function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err);
  }

  next();
})
export class UserSchema extends Typegoose {
  @prop({required: true, unique: true})
  workNumber: string;

  @prop({required: true})
  password: string;

  // 0: normal user
  // 1: verified user
  // 2: professional user
  // >10: admin
  // >50: super admin
  @prop({required: true, default: 0})
  role: number;

  @prop({required: true})
  group: string;

  @prop({ default: Date.now() })
  createAt: any;

  @prop({ default: Date.now() })
  updateAt: any;

  @instanceMethod
  async comparePassword(_password) {
    return await bcrypt
      .compare(_password, this.password)
      .catch(err => console.log(err));
  }
}
