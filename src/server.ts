import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const server = express();

server.use(express.json());

server.use('/categories', categoriesRoutes);

server.listen(9090, () => {
  console.log('Server on! 🤯️🚀️');
});
