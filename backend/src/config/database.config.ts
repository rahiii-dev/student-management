import mongoose from 'mongoose';
import { getEnvironmentConfig } from './environment.config';

const { DB_URI, DB_NAME } = getEnvironmentConfig();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: DB_NAME,
    });
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};
