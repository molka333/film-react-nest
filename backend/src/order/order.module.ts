import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../films/films.schema';
import { Order, OrderSchema } from './order.schema';
import { OrderRepository } from './order.repository';
import { FilmsRepository } from 'src/films/films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, FilmsRepository],
})
export class OrderModule {}
