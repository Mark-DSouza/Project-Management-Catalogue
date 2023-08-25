import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';

export default registerAs(
  'ormConfig',
  (): TypeOrmModuleOptions =>
    ({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Project],
      synchronize: true,
    } as TypeOrmModuleOptions),
);
