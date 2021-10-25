import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import createLocaleMiddleware from 'express-locale';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import * as config from './ormconfig';
import routes from './routes';
import * as swaggerFile from '../swagger_output.json';

dotenv.config();

createConnection(config)
  .then(async () => {
    const app = express();
    const limiter = rateLimit({
      windowMs: 10 * 60 * 1000, // Mins
      max: 10000,
    });
    // Middleware
    app.use(cors({ origin: process.env.CLIENT_URL }));
    app.use(limiter);
    app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      createLocaleMiddleware({
        priority: ['accept-language', 'default'],
        default: 'en_US',
      }),
    );

    // Routes
    app.get('/', (request, response) => {
      return response.status(200).json({ message: 'test' });
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(routes);

    // start express server
    app.listen({ port: process.env.PORT || 3333 }, () =>
      console.log(`🚀 Server ready on port: ${process.env.PORT || 3333}!`),
    );
  })
  .catch(error => console.log(error));
