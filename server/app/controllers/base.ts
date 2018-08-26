import { Model, Query, Types } from 'mongoose';

export abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  };

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  };

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  };

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };
}

export default BaseCtrl;

/*
export interface IRead<T> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: string, callback: (error: any, result: T) => void) => void;
  findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T>;
  find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): Query<T[]>;
}

export interface IWrite<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  update: (_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {

  private _model: Model<Document>;

  constructor(schemaModel: Model<Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: T) => void) {
    this._model.create(item, callback);
  }

  retrieve(callback: (error: any, result: T) => void) {
    this._model.find({}, callback);
  }

  update(_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.update({ _id: _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T> {
    return this._model.findOne(cond, callback);
  }

  find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): Query<T[]> {
    return this._model.find(cond, options, callback);
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }

}
*/
