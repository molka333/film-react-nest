import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(
      JSON.stringify({
        level: 'log',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(
      JSON.stringify({
        level: 'error',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(
      JSON.stringify({
        level: 'warn',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(
      JSON.stringify({
        level: 'debug',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  verbose(message: unknown, ...optionalParams: unknown[]) {
    console.log(
      JSON.stringify({
        level: 'verbose',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
}
