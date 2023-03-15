import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
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
    if (Client.role == 'admin') {
      const meeting = await this.repo.find({
        relations: { user: true },
      });

      return meeting;
    }
    const meeting = await this.repo.find({
      where: { user: Client },
      relations: { user: true },
    });

    return meeting;
  }

  async findOne(id: number) {
    const meeting = await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });
    return meeting;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.findOne(id);
    if (!meeting) {
      throw new NotFoundException('meeting not found');
    }
    Object.assign(meeting, updateMeetingDto);
    return this.repo.save(meeting);
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
