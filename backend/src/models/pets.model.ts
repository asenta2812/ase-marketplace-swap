// pets-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'pets';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      nft_id: { type: Number, required: true },
      owner_id: { type: Number, required: true },
      gender: { type: String, default: 'male', enum: ['male', 'female'] },
      stats_attack: { type: Number },
      stats_def: { type: Number },
      stats_hp: { type: Number },
      stats_speed: { type: Number },
      parent_id: { type: Number },
      mother_id: { type: Number },
      listing_price: { type: Number },
      listed_at: { type: Date },
      status: { type: String },
      user_buy_id: { type: Number },
      images: { type: Array },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
