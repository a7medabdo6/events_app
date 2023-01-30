import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceUserDto } from './dto/create-service-user.dto';
import { UpdateServiceUserDto } from './dto/update-service-user.dto';
import { ServiceUser } from './entities/service-user.entity';

@Injectable()
export class ServiceUserService {
  constructor(
    @InjectRepository(ServiceUser) private repo: Repository<ServiceUser>,
  ) {}

  async create(createServiceUserDto: CreateServiceUserDto) {
    const ServiceUser = await this.repo.create(createServiceUserDto);
    return this.repo.save(ServiceUser);
  }

  async findAll() {
    const allServiceUser = await this.repo.find({});
    return allServiceUser;
  }

  async findOne(id: number) {
    console.log(id, 'id');
    if (!id) {
      throw new UnauthorizedException('unAuthorized');
    }
    const serviceuser = await this.repo.findOne({ where: { id } });
    if (!serviceuser) {
      throw new NotFoundException('service user not found');
    }
    return serviceuser;
  }
  async update(id: number, updateServiceUserDto: UpdateServiceUserDto) {
    const serviceuser = await this.findOne(id);
    if (!serviceuser) {
      throw new NotFoundException('service user not found');
    }
    Object.assign(serviceuser, updateServiceUserDto);
    return this.repo.save(serviceuser);
  }

  async remove(id: number) {
    const serviceuser = await this.findOne(id);
    if (!serviceuser) {
      throw new NotFoundException('service user not found');
    }
    return this.repo.remove(serviceuser);
  }
}
