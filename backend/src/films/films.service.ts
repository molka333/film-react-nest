import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    const films = await this.filmsRepository.findAll();
    return { total: films.length, items: films };
  }

  async getSchedule(id: string) {
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
