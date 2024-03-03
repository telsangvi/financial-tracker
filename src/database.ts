import { connect } from 'mongoose';

const MONGO_URI = 'mongodb://db:27017/FinancialTracker';

export default async function connectToDatabase(): Promise<void> {
  try {
    await connect(MONGO_URI);
    console.log('Connected to mongo database');
  } catch (err) {
    console.log('Error connecting to mongo database', err);
    process.exit(1);
  }
}
