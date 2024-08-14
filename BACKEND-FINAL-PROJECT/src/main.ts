import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRouter from './routers/movieRouter.js';

dotenv.config();

const PORT = process.env.PORT || 7878;



// App creation
const app = express();

app.use(cors({
    origin:'*'
}));

app.use(express.json());
app.use('/api', movieRouter);



const startApp = async () => {
  try {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production on port ${PORT}`);
      } else {
        console.log(`Server is running in development on port ${PORT}`);
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error connecting to database', err.message);
    }
  }
};
startApp();