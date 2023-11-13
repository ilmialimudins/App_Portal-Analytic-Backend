import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { join } from 'path';
import 'winston-daily-rotate-file';

import { AppModule } from './app.module';
import { RequestTransformPipe } from './pipes/request-transform.pipe';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.services';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const logsDirectory = join(__dirname, `/../${process.env.LOGDIR || 'logs'}`);

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.DailyRotateFile({
          // %DATE will be replaced by the current date
          filename: `${logsDirectory}/error/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, // don't want to zip our logs
          maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename: `${logsDirectory}/combined/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });

  app.enableCors({
    origin: [
      'https://devproxy.astra.co.id',
      'http://hcanalyticsdev.astra.co.id:3000',
      'http://localhost:3000',
      'https://irportaldev.azurewebsites.net',
      'https://irportalstg.azurewebsites.net',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  });

  app.use(helmet());

  app.useGlobalPipes(
    new RequestTransformPipe(),
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  await app.listen(
    `${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
    '0.0.0.0',
  );
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
