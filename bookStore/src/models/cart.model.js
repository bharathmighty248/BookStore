import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      books: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total: {
            type: Number
        }
      }],
      totalAmount: {
        type: Number
      },
      isPurchased: {
          type: Boolean,
          default: false
      }
  }
);

export default model('cart', cartSchema);