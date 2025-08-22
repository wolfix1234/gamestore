// mongoClient.ts
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import { DatabaseOptions } from '@/types/index'; // adjust path as needed

dotenv.config(); // Load environment variables

const options: DatabaseOptions = {
  uri: process.env.MONGODB_URI as string,
  dbName: process.env.MONGODB_DB as string,
};

if (!options.uri || !options.dbName) {
  throw new Error('❌ MONGODB_URI or MONGODB_DB is not defined in .env');
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongo(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(options.uri);
    await client.connect();
    db = client.db(options.dbName);
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}

export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}
