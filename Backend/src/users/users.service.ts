import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Not, Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export enum UserRole {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(UpdateUser: UpdateUserDto) {
    const user = await this.repo.findOne({
      where: {
        email: UpdateUser.email,
        code: UpdateUser.code,
      },
    });
    if (!user) {
      throw new NotFoundException(
        'user not found please call admin for more info',
      );
    }
    Object.assign(user, UpdateUser);
    return this.repo.save(user);
  }
  createcode(CreateCodeDto: CreateCodeDto) {
    const user = this.repo.create(CreateCodeDto);
    return this.repo.save(user);
  }
  createCodeadmin(CreateCodeDto: CreateCodeDto) {
    const user = this.repo.create({...CreateCodeDto,type:"admin",role:"admin"});
    return this.repo.save(user);
  }
  async findAll(userRole: string) {
    const users = await this.repo.find({
      where: { role: Not(UserRole.admin) },
      relations: { Docs: true },
    });

    return users;
  }

  async findOne(id: number) {
    console.log(id, 'id');
    if (!id) {
      throw new UnauthorizedException('unAuthorized');
    }
    const user = await this.repo.findOne({
      where: { id },
      relations: { Docs: true },
    });
    if (!user) {
      throw new NotFoundException('user not found5');
    }
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({
      where: { email },
      relations: { Docs: true },
    });

    return user;
  }
  async update(id: number, updateUser: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUser);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
