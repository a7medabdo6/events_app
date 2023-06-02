import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateCodeDto } from 'src/users/dto/create-code.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async createCode(CreateCodeDto: CreateCodeDto) {
    const { email, code, type } = CreateCodeDto;
    const users = await this.usersService.findOneByEmail(email);
    if (users) {
      throw new BadRequestException('email in use');
    }

    const user = await this.usersService.createcode(CreateCodeDto);
    return user;
  }
  async createCodeadmin(CreateCodeDto: any) {
    const { email, code, type } = CreateCodeDto;
    const users = await this.usersService.findOneByEmail(email);
    if (users) {
      throw new BadRequestException('email in use');
    }

    const user = await this.usersService.createCodeadmin(CreateCodeDto);
    return user;
  }
  async signup(createUserDto: CreateUserDto) {
    const { email, password, role, createBy, username } = createUserDto;
    const users = await this.usersService.findOneByEmail(email);
    if (users && !users.active) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');

      const user = await this.usersService.create({
        ...createUserDto,
        password: result,
        active: true,
      });
      return user;
    } else if (users && users.active) {
      throw new BadRequestException('email already Registered');
    }
    throw new BadRequestException('email not Exist');
  }
  async signin(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('user Not Fpund');
    }
    const [salt, stroreHash] = user.password.split('.');
    console.log(salt);
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (stroreHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }
    return user;
  }
}
