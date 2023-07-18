import '../boilerplate.polyfill';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  extra: {
    validateConnection: false,
    trustServerCertificate: true,
  },
});
