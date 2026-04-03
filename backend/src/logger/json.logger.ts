import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(
      JSON.stringify({
        level: 'log',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(
      JSON.stringify({
        level: 'error',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      JSON.stringify({
        level: 'warn',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  debug(message: any, ...optionalParams: any[]) {
    console.debug(
      JSON.stringify({
        level: 'debug',
        message,
        optionalParams,
        timestamp: new Date(),
      }),
    );
  }
  verbose(message: any, ...optionalParams: any[]) {
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
