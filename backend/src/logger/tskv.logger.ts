import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: unknown) {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    return `time=${new Date().toISOString()}\tlevel=${level}\tmsg=${msg}\n`;
  }

  log(message: unknown) {
    process.stdout.write(this.format('info', message));
  }
  error(message: unknown) {
    process.stderr.write(this.format('error', message));
  }
  warn(message: unknown) {
    process.stdout.write(this.format('warn', message));
  }
}
