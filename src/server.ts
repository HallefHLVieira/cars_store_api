import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import './database';
import './shared/container';

import { AppError } from './errors/AppError';
import { router } from './routes';
import swaggerFile from './swagger.json';

// import by database connection

const server = express();

server.use(express.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(router);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

server.listen(9090, () => {
  console.log('Server on! 🤯️🚀️');
});
