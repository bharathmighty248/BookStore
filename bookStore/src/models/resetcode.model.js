import { Schema, model } from 'mongoose';

const codeSchema = new Schema(
  {
    email: {
        type: String
    },
    resetcode: {
        type: String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expireAfterSeconds:180}
    }
  }
);

export default model('resetcode', codeSchema);