import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { configProvider } from './app.config.provider';
import { AppConfigModule } from './app.config.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
// import { AppConfig } from './app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from './films/films.entity';
import { Schedule } from './films/schedules.entity';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Film, Schedule],
        synchronize: false,
      }),
    }),
    FilmsModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  providers: [configProvider],
})
export class AppModule {}
