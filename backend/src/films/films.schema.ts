import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Schedule {
  @Prop() id: string;
  @Prop() daytime: string;
  @Prop() hall: string;
  @Prop() rows: number;
  @Prop() seats: number;
  @Prop() price: number;
  @Prop([String]) taken: string[];
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film extends Document {
  @Prop({ required: true }) id: string;
  @Prop() rating: number;
  @Prop() director: string;
  @Prop([String]) tags: string[];
  @Prop() title: string;
  @Prop() about: string;
  @Prop() description: string;
  @Prop() image: string;
  @Prop() cover: string;

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
