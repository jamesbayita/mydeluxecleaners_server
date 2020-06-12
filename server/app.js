// APP SERVER
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {MONGO_URI} from './config';
import {usersRouter} from './routes/index';

// CONNECT TO MONGO
async function connectMongo() {
    try {
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MONGOOSE CONNECTED SUCCESSFULLY');      
    } catch (error) {
        console.log(`There was an error connecting to mongoose ${error}`);
    }
}
connectMongo();

// SET UP EXPRESS APP
const app = express();
        
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// SET UP EXPRESS ROUTES
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', usersRouter);
    
export default app;