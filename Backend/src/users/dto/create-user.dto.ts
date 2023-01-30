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
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  code: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNumber()
  @IsOptional()
  createBy: number;
  @IsOptional()
  active: boolean;
}
