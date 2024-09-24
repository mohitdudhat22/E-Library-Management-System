import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();


// await dbConnect().then(() => {
//     console.log('Connected to database');
//     // app.on('error', (error) => {
//     //     console.log(error);
//     //     throw error;
//     // });
//     // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     return app;
// });

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Accept', 'Origin', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));



export {app}