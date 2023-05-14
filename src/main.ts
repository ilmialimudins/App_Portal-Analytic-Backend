import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { RequestTransformPipe } from './pipes/request-transform.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes(
    new RequestTransformPipe(),
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  await app.listen(
    `${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
    '0.0.0.0',
  );
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
