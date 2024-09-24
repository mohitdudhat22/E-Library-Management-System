import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);


const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}

export default dbConnect;
