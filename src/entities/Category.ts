import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
  userReference: mongoose.Types.ObjectId;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userReference: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // Assuming your user model is named 'User'
      required: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
