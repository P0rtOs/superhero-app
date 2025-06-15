import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import superheroRoutes from './routes/superhero.routes';
import './config/db';
import { initDb } from './config/initDb';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';
import path from 'path';

console.log(__dirname);

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:1234', 'http://localhost:1234']
}));

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use(express.json());

app.use('/api/superheroes', superheroRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;
(async () => {
  await initDb();
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
})();
