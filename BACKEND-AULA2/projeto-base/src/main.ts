import express, { Express } from "express";

import usersRouter from './routers/usersRouter.js';
import productsRouter from './routers/productsRouter.js';


const app: Express = express();

app.use(express.json());

app.use(usersRouter);
app.use(productsRouter);




const PORT: number = 3000;


app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT}`);
});