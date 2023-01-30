import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceUserService } from './service-user.service';
import { CreateServiceUserDto } from './dto/create-service-user.dto';
import { UpdateServiceUserDto } from './dto/update-service-user.dto';

@Controller('service-user')
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}

  @Post()
  create(@Body() createServiceUserDto: CreateServiceUserDto) {
    return this.serviceUserService.create(createServiceUserDto);
  }

  @Get()
  findAll() {
    return this.serviceUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceUserDto: UpdateServiceUserDto) {
    return this.serviceUserService.update(+id, updateServiceUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceUserService.remove(+id);
  }
}
