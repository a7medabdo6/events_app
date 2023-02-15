import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting) private repo: Repository<Meeting>,
    private readonly usersService: UsersService,
  ) {}

  async create(createMeetingDto: CreateMeetingDto, user: User) {
    const meeting = await this.repo.create(createMeetingDto);
    meeting.user = user;
    return this.repo.save(meeting);
  }

  async findAll(ClientId: number) {
    const Client = await this.usersService.findOne(ClientId);
    const meeting = await this.repo.find({
      where: { user: Client },
    });

    return Client;
  }

  async findOne(id: number) {
    const meeting = await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });
    return meeting;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
