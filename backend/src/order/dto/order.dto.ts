import {
  IsString,
  IsNumber,
  IsISO8601,
  IsUUID,
  IsEmail,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsString()
  day: string;

  @IsISO8601() // Проверяет формат даты ISO8601
  daytime: string;

  @IsString()
  time: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+7|8)[0-9]{10}$/, {
    message: 'Некорректный формат номера телефона',
  })
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}
