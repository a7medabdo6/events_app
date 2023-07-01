import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum UserRole {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}
export class CreateCodeDto {
  @IsEmail({}, { message: 'Must be a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide Code' })
  code: string;

  @IsEnum(UserRole, { message: 'Invalid user role.' })
  type: UserRole;
}
