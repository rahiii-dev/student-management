import express from 'express';
import { getEnvironmentConfig } from './config/environment.config';
import { connectToDatabase } from './config/database.config';

const app = express();
const PORT = getEnvironmentConfig().PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_, res) => {
  res.json('Welcome student db');
});

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
