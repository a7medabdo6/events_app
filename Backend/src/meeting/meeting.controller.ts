import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { UsersService } from 'src/users/users.service';

@Controller('meeting')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly usersService: UsersService,
  ) {}

  @Post('create')
  async uploadFile(@Body() body: CreateMeetingDto) {
    // const isEmpty = Object.keys(files).length === 0;
    // if (isEmpty || !files || req.fileValidationError) {
    //   throw new BadRequestException(req.fileValidationError);
    // }

    const User = await this.usersService.findOne(+body.user);

    const product = await this.meetingService.create(
      {
        ...body,
      },
      User,
    );

    throw new HttpException('CREATED', HttpStatus.CREATED);
  }

  @Get()
  findAll(@Query('ClientId') ClientId: number) {
    return this.meetingService.findAll(ClientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(+id, updateMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }
}
