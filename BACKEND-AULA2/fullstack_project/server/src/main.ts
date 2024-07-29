import express, { Express } from "express";
import cors from 'cors';
import usersRouter from './routers/userRouter.js';
import productsRouter from './routers/productRouter.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

//console.log(process.env.MONGO_URI);


app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(productsRouter);


const PORT = process.env.PORT || 3000;

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "")
        console.log("Connected to db");

        app.listen(PORT, () => {
            console.log(`Server is runnig on ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

startApp();