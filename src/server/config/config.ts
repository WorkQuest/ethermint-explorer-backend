import { config, } from 'dotenv';

config();

export default {
  dbLink: process.env.DB_LINK,
  server: {
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
    shutdownTimeout: process.env.SERVER_SHUTDOWN_TIMEOUT
      ? Number(process.env.SERVER_SHUTDOWN_TIMEOUT)
      : 15000,
  },
  cors: {
    origins: process.env.CORS_ORIGINS ? JSON.parse(process.env.CORS_ORIGINS) : ['*'],
    methods: process.env.CORS_METHODS
      ? JSON.parse(process.env.CORS_METHODS)
      : ['POST, GET, OPTIONS'],
    headers: process.env.CORS_HEADERS
      ? JSON.parse(process.env.CORS_HEADERS)
      : ['Accept', 'Content-Type', 'Authorization'],
    maxAge: process.env.CORS_MAX_AGE ? Number(process.env.CORS_MAX_AGE) : 600,
    allowCredentials: process.env.CORS_ALLOW_CREDENTIALS
      ? process.env.CORS_ALLOW_CREDENTIALS
      : 'true',
    exposeHeaders: process.env.CORS_EXPOSE_HEADERS
      ? JSON.parse(process.env.CORS_EXPOSE_HEADERS)
      : ['content-type', 'content-length'],
  },
  rpc: {
    url: process.env.RPC_URL,
    ws: process.env.WS_URL
  },
  blockchain: {
    coin: process.env.DEFAULT_COIN
  }
};
