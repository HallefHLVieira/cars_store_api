import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from './swagger.json';

// import by database connection
import './database';

const server = express();

server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(router);

server.listen(9090, () => {
  console.log('Server on! 🤯️🚀️');
});
