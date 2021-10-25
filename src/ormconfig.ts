import * as dotenv from 'dotenv';
import * as PostgresConnectionStringParser from 'pg-connection-string';
import { ConnectionOptions } from 'typeorm';

dotenv.config();
const databaseUrl = process.env.DATABASE_URL as string;
const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);

const config: ConnectionOptions = {
  type: 'postgres',
  host: connectionOptions.host as string,
  port: Number(connectionOptions.port as string),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database as string,
  entities: [`${__dirname}/models/*{.js,.ts}`],
  migrations: [`${__dirname}/database/migrations/*{.js,.ts}`],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: `${__dirname}/database/migrations`,
  },
};

export = config;
