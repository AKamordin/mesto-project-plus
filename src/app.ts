import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { DEFAULT_DB_URL, DEFAULT_PORT } from './constants';
import errorMiddleware from './middlewares/error';
import authMiddleware from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';
import router from './routes';
import { isSignInRequestValid, isSignUpRequestValid } from './validators/user';

const { PORT = DEFAULT_PORT, DB_URL = DEFAULT_DB_URL } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

// Unprotected
app.post('/signin', isSignInRequestValid, login);
app.post('/signup', isSignUpRequestValid, createUser);

app.use(authMiddleware);

// Protected
app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorMiddleware);

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to mestodb'))
  .catch((err) => console.error(err.message));

app.listen(PORT, () => {
  console.log(`Mesto API server is running on ${PORT} port`);
});
