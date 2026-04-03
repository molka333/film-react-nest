import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any) {
    return `time=${new Date().toISOString()}\tlevel=${level}\tmsg=${message}\n`;
  }

  log(message: any) {
    process.stdout.write(this.format('info', message));
  }
  error(message: any) {
    process.stderr.write(this.format('error', message));
  }
  warn(message: any) {
    process.stdout.write(this.format('warn', message));
  }
}
