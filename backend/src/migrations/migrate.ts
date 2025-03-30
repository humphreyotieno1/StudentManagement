import { MongoClient } from 'mongodb';
import * as initialSchema from './001_initial_schema';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management';

async function runMigrations() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        
        // Run migrations
        console.log('Running initial schema migration...');
        await initialSchema.up(db);
        console.log('Initial schema migration completed');

        console.log('All migrations completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

runMigrations(); 