import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormConfig';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [ormConfig] }),
    TypeOrmModule.forRoot(ormConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
