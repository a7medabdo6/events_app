import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateServiceUserDto {


    
  @IsString()
  initials: string;

  @IsNumber()
  lcds: number;

  @IsString()
  age_ate_refferal: string;

  @IsString()
  home_address: string;

  @IsString()
  school_address: string;

  @IsString()
  sex: string;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  qurdian: string;

  @IsNumber()
  qurdian_contact: number;

  @IsString()
  relationship: string;

  @IsString()
  support_worker: string;

  @IsString()
  assesment_date: string;

  @IsString()
  disability: string;

  @IsString()
  ethnicity: string;

  @IsString()
  religion: string;

  @IsNumber()
  compliment_of_the_household: number;
}
