import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AccessJwtAuthMiddleware } from './auth';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { UserModule } from './user';
import { APP_PIPE } from '@nestjs/core';
import { GlobalValidationPipe } from './lib/validation';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessJwtAuthMiddleware).forRoutes('*');
  }
}
