import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';

import { ApiConfigService } from './shared/services/api-config.services';
import { ResponseTransformInterceptor } from 'src/interceptors/response-transform.interceptor';
import { SentryModule } from './sentry/sentry.module';
import { MasterCompanyModule } from './modules/master-company/master-company.module';
import { FactorModule } from './modules/factor/factor.module';
import { PredEngagamentValueModule } from './modules/pred-engagement-value/pred-engagement-value.module';
import { MasterQcodeModule } from './modules/master-qcode/master-qcode.module';
import { MasterSurveygizmoModule } from './modules/master-surveygizmo/master-surveygizmo.module';
import { PredEngagementFavorableModule } from './modules/pred-engagement-favorable/pred-engagement-favorable.module';
import { PredPredictionEngagementModule } from './modules/pred-prediction-engagement/pred-prediction-engagement.module';
import { PredRelativeImportanceModule } from './modules/pred-relative-importance/pred-relative-importance.module';
import { MasterEngagementModule } from './modules/master-engagement/master-engagement.module';

import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { MasterCompanyEESModule } from './modules/master-company-ees/master-company-ees.module';

const ApiModules = [
  SharedModule,
  MasterCompanyModule,
  MasterCompanyEESModule,
  FactorModule,
  PredEngagamentValueModule,
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
    MasterQcodeModule,
    MasterSurveygizmoModule,
    PredEngagementFavorableModule,
    PredPredictionEngagementModule,
    PredRelativeImportanceModule,
    MasterEngagementModule,
  ],
  controllers: [AppController],
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
