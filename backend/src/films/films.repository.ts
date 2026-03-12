import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findOne(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async update(film: Film): Promise<Film> {
    return film.save();
  }
}
