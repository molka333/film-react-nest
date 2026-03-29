import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from 'src/films/films.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    for (const ticket of createOrderDto.tickets) {
      const film = await this.filmsRepository.findOne(ticket.film);

      if (!film) {
        throw new NotFoundException(`Фильм с id ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);
      }

      const seatLabel = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(seatLabel)) {
        throw new BadRequestException(`Место ${seatLabel} уже забронировано`);
      }
      session.taken.push(seatLabel);
      await film.save();
    }

    await this.orderRepository.saveOrder(createOrderDto);

    return {
      total: createOrderDto.tickets.length,
      items: createOrderDto.tickets,
    };
  }
}
