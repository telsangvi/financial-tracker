import mongoose, { Document, Schema } from 'mongoose';

enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

interface ITransaction extends Document {
  amount: number;
  date: Date;
  category: string;
  userReference: mongoose.Types.ObjectId;
  type: TransactionType;
}

const transactionSchema: Schema<ITransaction> = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userReference: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // Assuming your user model is named 'User'
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  transactionSchema,
);

export default Transaction;
