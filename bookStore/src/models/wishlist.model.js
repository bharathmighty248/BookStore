import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema(
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
        author: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
      }],
  }
);

export default model('mywishlist', wishlistSchema);
