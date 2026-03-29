import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsDto, GetScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<GetFilmsDto> {
    return await this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<GetScheduleDto> {
    return await this.filmsService.getSchedule(id);
  }
}
