import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { SharedModule } from './shared/shared.module';

import { ApiConfigService } from './shared/services/api-config.services';
import { ResponseTransformInterceptor } from 'src/interceptors/response-transform.interceptor';
import { SentryModule } from './sentry/sentry.module';
import { MasterCompanyModule } from './modules/master-company/master-company.module';

import * as Sentry from '@sentry/node';
import '@sentry/tracing';

const ApiModules = [
  LeadsModule,
  UsersModule,
  SharedModule,
  MasterCompanyModule,
];

@Module({
  imports: [
    ...ApiModules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        return configService.mssqlConfig;
      },
      inject: [ApiConfigService],
    }),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: true,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
