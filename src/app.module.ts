import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { UserModule } from './user';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
})
export class AppModule {}
