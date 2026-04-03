import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    const films = await this.filmsRepository.findAll();

    return {
      total: films.length,
      items: films.map((film) => ({
        ...film,
        tags:
          typeof film.tags === 'string'
            ? film.tags.split(',').map((t) => t.trim())
            : film.tags,
      })),
    };
  }

  async getSchedule(id: string) {
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    return {
      total: film.schedules.length,
      items: film.schedules.map((schedule) => ({
        ...schedule,
        hall: String(schedule.hall),
        taken: schedule.taken
          ? schedule.taken.split(',').filter((seat) => seat.trim() !== '')
          : [],
      })),
    };
  }
}
