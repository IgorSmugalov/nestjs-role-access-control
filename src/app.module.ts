import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { GlobalValidationPipe } from './lib/validation';
import { PermissionModule } from './permissions';
import { UserModule } from './user';
import { JwtAuthMiddleware } from './auth';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PermissionModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
