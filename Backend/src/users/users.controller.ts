import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Session,
  UseInterceptors,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { get } from 'http';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { CurrentUserInterceptor } from '../users/interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateCodeDto } from './dto/create-code.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('users')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoami(@CurrentUser() user: unknown) {
    return user;
  }
  @Get('/trans')
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }
  @Post('/create')
  async createCode(
    @Body() CreateCodeDto: CreateCodeDto,
    @Session() session: any,
  ) {
    const user = await this.authService.createCode(CreateCodeDto);
    session.userId = user.id;
    return user;
  }
  @Post('/create-admin')
  async createCodeAmdin(
    @Body() CreateCodeDto: CreateCodeDto,
    @Session() session: any,
  ) {
    const user = await this.authService.createCodeadmin({...CreateCodeDto,type:"admin"});
    session.userId = user.id;
    return user;
  }
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() createUserDto: any, @Session() session: any) {
    const user = await this.authService.signin(createUserDto);
    session.userId = user.id;
    return user;
  }
  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return 'ok';
  }
  /*************************************************** */
  @Get()
  findAll(@Query('userRole') userRole: string) {
    console.log(userRole, 'userRole');
    return this.usersService.findAll(userRole);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024*100, // 1 MB
      },
    }),
  )
  update(@Param('id') id: string, @Body() updateUserDto: any,    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.update(+id, {...updateUserDto ,image: file?.filename});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}




