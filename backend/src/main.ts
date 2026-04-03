import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const logType = process.env.LOG_TYPE;

  let logger;
  if (logType === 'json') {
    logger = new JsonLogger();
  } else if (logType === 'tskv') {
    logger = new TskvLogger();
  } else {
    logger = new DevLogger();
  }

  const app = await NestFactory.create(AppModule, {
    logger: logger,
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
