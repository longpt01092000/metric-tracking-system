import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // Swagger configuration
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    tag: process.env.SWAGGER_TAG,
    prefix: process.env.SWAGGER_PREFIX,
  },

  // Database configuration (if you are using MongoDB, for example)
  database: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/metricdb',
  },

  // Other application-level configurations can be added here
  port: process.env.PORT || 3000,
}));
