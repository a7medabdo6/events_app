import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum UserRole {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}
export class CreateCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsEnum(UserRole)
  type: UserRole;
}
