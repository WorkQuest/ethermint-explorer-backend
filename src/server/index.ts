import * as Hapi from '@hapi/hapi';
import * as Nes from '@hapi/nes';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as Pino from 'hapi-pino';
import * as HapiCors from 'hapi-cors';
import * as HapiPulse from 'hapi-pulse';
import * as Qs from 'qs';
import routes from './routes';
import config from './config/config';
import { handleValidationError, responseHandler, } from './utils';
import SwaggerOptions from './config/swagger';
import { pinoConfig, } from './config/pino';
import { initDatabase } from './database';

const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

SwaggerOptions.info.version = Package.version;

const init = async () => {
  const server = await new Hapi.Server({
    port: config.server.port,
    host: config.server.host,
    query: {
      parser: (query) => Qs.parse(query),
    },
    routes: {
      validate: {
        options: {
          // Handle all validation errors
          abortEarly: false,
        },
        failAction: handleValidationError,
      },
      response: {
        failAction: 'log',
      },
    },
  });
  server.realm.modifiers.route.prefix = '/api';
  // Регистрируем расширения
  await server.register([
    Nes,
    Inert,
    Vision,
    { plugin: Pino, options: pinoConfig(false), },
    { plugin: HapiSwagger, options: SwaggerOptions, }
  ]);
  server.app.db = await initDatabase();

  // Загружаем маршруты
  server.route(routes);
  // Error handler
  server.ext('onPreResponse', responseHandler);
  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT'],
    },
  });
  // Enable CORS (Do it last required!)
  await server.register({
    plugin: HapiCors,
    options: config.cors,
  });
  // Запускаем сервер
  try {
    await server.start();
    server.log('info', `Server running at: ${server.info.uri}`);
  }
  catch (err) {
    server.log('error', JSON.stringify(err));
  }

  return server;
};

export { init, };
