import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';

dotenv.config();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Api Authenticate',
    description: 'Api de autenticação para testar',
  },
  host: process.env.PROD_HOST,
  schemes: ['http', 'https'],
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Development server',
      templates: {
        scheme: {
          enum: ['http', 'https'],
          default: 'https',
        },
      },
    },
    {
      url: process.env.PROD_HOST,
      description: 'Production server',
      templates: {
        scheme: {
          enum: ['http', 'https'],
          default: 'https',
        },
      },
    },
  ],
  // - url: https://petstore.prd.com
  //   description: Production server

  // - url: {scheme}://petstore.dev.com/subpath
  //   description: Development server
  //   templates:
  //     scheme:
  //       enum:
  //         - http
  //         - https
  //       default: https
  // host: process.env.HOST,
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('./index');
});
