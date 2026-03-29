import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { Schedule } from '../films/schedules.entity';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), FilmsModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
