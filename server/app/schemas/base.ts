import { Schema } from 'mongoose';

export abstract class BaseSchema {    // TODO 抽象一个基础的schema
  abstract schema: Schema;

}
