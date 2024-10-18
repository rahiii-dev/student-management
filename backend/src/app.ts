import express from 'express';
import { getEnvironmentConfig } from './config/environment.config';
import { connectToDatabase } from './config/database.config';
import notFoundMiddleware from './middlewares/notFound.middleare';
import errorMiddleware from './middlewares/error.middleware';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';

const app = express();
const { PORT, NODE_ENV } = getEnvironmentConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (NODE_ENV === 'developement') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.get('/', (_, res) => {
  res.json('Welcome student db');
});

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
