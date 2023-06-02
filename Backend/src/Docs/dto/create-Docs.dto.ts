import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateDocsDto {
  @IsString()
  type: string;

  @IsOptional()
  doc: string;
  @IsString()
  typeOfFile: string;
  @IsString()
  @IsOptional()
  extra: string;

  @IsOptional()
  userId: number;
}
