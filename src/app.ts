import express from 'express';
import {DEFAULT_DB_URL, DEFAULT_PORT} from "./constants";
import mongoose from "mongoose";
import errorMiddleware from './middlewares/error';
import authMiddleware from './middlewares/auth';
import router from './routes';

const { PORT = DEFAULT_PORT, DB_URL = DEFAULT_DB_URL} = process.env
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(authMiddleware);

app.use(router);

app.use(errorMiddleware)

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to mestodb'))
  .catch(err => console.error(err.message))

app.listen(PORT, () => {
  console.log(`Mesto API server is running on ${PORT} port`);
})
