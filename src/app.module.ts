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
import { FactorModule } from './modules/factor/factor.module';
import { PredEngagamentValueModule } from './modules/pred-engagement-value/pred-engagement-value.module';
import { MasterQcodeModule } from './modules/master-qcode/master-qcode.module';
import { MasterSurveygizmoModule } from './modules/master-surveygizmo/master-surveygizmo.module';
import { PredEngagementFavorableModule } from './modules/pred-engagement-favorable/pred-engagement-favorable.module';
import { PredPredictionEngagementModule } from './modules/pred-prediction-engagement/pred-prediction-engagement.module';
import { PredRelativeImportanceModule } from './modules/pred-relative-importance/pred-relative-importance.module';
import { MasterEngagementModule } from './modules/master-engagement/master-engagement.module';
import { DuendeAuthenticationModule } from './modules/duende-authentication/duende-authentication.module';

import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { SpmInvitedRespondentsModule } from './modules/spm-invited-respondents/spm-invited-respondents.module';
import { CompanyModule } from './modules/master-company-ees/master-company-ees.module';
import { BusinessLineModule } from './modules/master-business-line/master-business-line.module';
import { DemographyModule } from './modules/master-demography/master-demography.module';
import { BusinessGroupModule } from './modules/master-business-group/master-business-group.module';
import { LocationModule } from './modules/master-location/master-location.module';
import { StopwordsModule } from './modules/stopwords/stopwords.module';
import { ReplaceWordcloudModule } from './modules/replace-wordcloud/replace-wordcloud.module';
import { NgramModule } from './modules/ngram/ngram.module';
import { MasterUserModule } from './modules/master-user/master-user.module';
import { MasterRoleModule } from './modules/master-role/master-role.module';
import { AccessUserModule } from './modules/access-user/access-user.module';
import { RoleUserModule } from './modules/role-user/role-user.module';
import { MasterMenuModule } from './modules/master-menu/master-menu.module';
import { RoleMenuModule } from './modules/role-menu/role-menu.module';
import { MasterWorkSpaceModule } from './modules/master-work-space/master-work-space.module';
import { MasterReportModule } from './modules/master-report/master-report.module';
import { MasterSectionModule } from './modules/master-section/master-section.module';
import { MappingMenuReportModule } from './modules/mapping-menu-report/mapping-menu-report.module';
import { SurveyGroupModule } from './modules/master-survey-group/master-survey-group.module';
import { ClaModule } from './modules/master-cla/master-cla.module';
import { DirectReviewModule } from './modules/master-direct-review/master-direct-review.module';
import { ModellingTypeModule } from './modules/master-modelling-type/master-modelling-type.module';
import { OwnershipStatusModule } from './modules/master-ownership-status/master-ownership-status.module';
import { SurveyValidationModule } from './modules/survey-validation/survey-validation.module';
import { MonitoringValidationModule } from './modules/monitoring-validation/monitoring-validation.module';
import { ValidateSurveyResultModule } from './modules/validate-survey-result/validate-survey-result.module';

const ApiModules = [
  SharedModule,
  DuendeAuthenticationModule,
  CompanyModule,
  BusinessLineModule,
  BusinessGroupModule,
  LocationModule,
  ClaModule,
  DirectReviewModule,
  ModellingTypeModule,
  OwnershipStatusModule,
  DemographyModule,
  SurveyGroupModule,
  StopwordsModule,
  ReplaceWordcloudModule,
  NgramModule,
  MasterUserModule,
  MasterRoleModule,
  AccessUserModule,
  RoleUserModule,
  MasterMenuModule,
  RoleMenuModule,
  MasterWorkSpaceModule,
  MasterReportModule,
  MasterSectionModule,
  MappingMenuReportModule,
  ValidateSurveyResultModule,
  SurveyValidationModule,
  MonitoringValidationModule,
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
    SpmInvitedRespondentsModule,
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
