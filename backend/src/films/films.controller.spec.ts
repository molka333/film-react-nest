import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsResponse = {
    total: 1,
    items: [{ id: '1', title: 'Inception', tags: ['sci-fi'] }],
  };

  const mockScheduleResponse = {
    total: 1,
    items: [{ id: 's1', day: 'monday', time: '10:00' }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllFilms: jest.fn().mockResolvedValue(mockFilmsResponse),
            getSchedule: jest.fn().mockResolvedValue(mockScheduleResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('должен вызывать filmsService.getAllFilms и возвращать список фильмов', async () => {
      const result = await controller.findAll();

      expect(service.getAllFilms).toHaveBeenCalled();
      expect(result).toEqual(mockFilmsResponse);
    });
  });

  describe('getSchedule', () => {
    it('должен вызывать filmsService.getSchedule с правильным ID', async () => {
      const filmId = '123';
      const result = await controller.getSchedule(filmId);

      expect(service.getSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(mockScheduleResponse);
    });
  });
});
