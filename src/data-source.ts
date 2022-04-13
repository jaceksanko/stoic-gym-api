import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test123',
  database: 'stoic-gym',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/entities/*.ts`],
  migrations: [],
  subscribers: [],
});
