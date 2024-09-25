import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

bookSchema.plugin(mongooseAggregatePaginate); // aggregation plugin
export default mongoose.model('Book', bookSchema);

    
