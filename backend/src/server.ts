import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { routes } from './routes';

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(3333, () => {
  console.log('Server running on port 3333');
});