import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../films/schedules.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async saveOrder(createOrderDto: CreateOrderDto) {
    const { tickets } = createOrderDto;

    if (!tickets || tickets.length === 0) {
      throw new NotFoundException('Билеты не выбраны');
    }

    const scheduleId = tickets[0].session;

    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException('Сеанс не найден');
    }

    const newTickets = tickets.map((t) => `${t.row}:${t.seat}`);

    const currentTaken = schedule.taken
      ? schedule.taken.split(',').filter((s) => s.trim() !== '')
      : [];

    schedule.taken = [...currentTaken, ...newTickets].join(',');

    return await this.scheduleRepository.save(schedule);
  }
}
