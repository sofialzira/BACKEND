import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 7878;
const app = express();
app.use(express.json());
const startApp = async () => {
  try {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production on port ${PORT}`);
      } else {
        console.log(`Server is running in development on port ${PORT}`);
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error connecting to database', err.message);
    }
  }
};
startApp();
