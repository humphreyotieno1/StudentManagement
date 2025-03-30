import mongoose from 'mongoose';

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-record-db';

const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
} as const;

export const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(DB_URI, dbConfig);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
        mongoose.connection.on('error', (err: Error) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
};
