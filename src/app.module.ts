import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AccessJwtAuthMiddleware } from './auth';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { UserModule } from './user';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessJwtAuthMiddleware).forRoutes('*');
  }
}
