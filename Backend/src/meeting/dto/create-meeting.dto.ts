import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateMeetingDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  notes: string;
  @IsString()
  @IsOptional()
  color: string;
  @IsString()
  @IsOptional()
  alarm_status: boolean;
  @IsString()
  @IsOptional()
  alarm_time: string;

  @IsNumber()
  user: User;
}
