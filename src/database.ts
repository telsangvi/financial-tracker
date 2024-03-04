import { connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export default async function connectToDatabase(): Promise<void> {
  try {
    await connect(MONGO_URI);
    console.log('Connected to mongo database');
  } catch (err) {
    console.log('Error connecting to mongo database', err);
  }
}
