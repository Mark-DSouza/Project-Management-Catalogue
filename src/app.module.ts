import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormConfig';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [ormConfig], isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule,
    ProjectsModule,
    UserModule,
  ],
})
export class AppModule {}
