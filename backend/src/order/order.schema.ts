import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class OrderTicket {
  @Prop({ required: true }) film: string;
  @Prop({ required: true }) session: string;
  @Prop({ required: true }) daytime: string;
  @Prop({ required: true }) day: string;
  @Prop({ required: true }) time: string;
  @Prop({ required: true }) row: number;
  @Prop({ required: true }) seat: number;
  @Prop({ required: true }) price: number;
}

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [OrderTicket], required: true })
  tickets: OrderTicket[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
