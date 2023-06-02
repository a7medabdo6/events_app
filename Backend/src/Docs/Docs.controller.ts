import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  Req,
  BadRequestException,
  HttpException,
  HttpStatus,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { DocsService } from './Docs.service';
import { CreateDocsDto } from './dto/create-Docs.dto';
import { UpdateDocsDto } from './dto/update-Docs.dto';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFilter } from 'src/utils/file-validator';
import { extname } from 'path';
import { DocsDto } from './dto/Docs.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UsersService } from 'src/users/users.service';
@Controller('docs')
// @UseInterceptors(CurrentUserInterceptor)
// @UseGuards(AuthGuard)
@Serialize(DocsDto)
export class DocsController {
  constructor(
    private readonly DocsService: DocsService,
    private readonly usersService: UsersService,
  ) {}

  // @Post()
  // create(@Body() createDocsDto: CreateDocsDto) {
  //   return this.DocsService.create(createDocsDto);
  // }

  @Get()
  findAll(@Query('ClientId') ClientId: number) {
    return this.DocsService.findAll(ClientId);
  }
  @Post('create')
  @UseInterceptors(
    FileInterceptor('doc', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024, // 1 MB
      },
    }),
  )
  async uploadFile(
    @Body() body: any,

    @UploadedFile() file: Express.Multer.File,
  ) {
    // const isEmpty = Object.keys(files).length === 0;
    // if (isEmpty || !files || req.fileValidationError) {
    //   throw new BadRequestException(req.fileValidationError);
    // }
    console.log(body)

    const User = await this.usersService.findOne(+body.userId);

    const product = await this.DocsService.create(
      {
        ...body,
        doc: file?.filename,
      },
      User,
    );

    throw new HttpException('CREATED', HttpStatus.CREATED);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.DocsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocsDto: UpdateDocsDto) {
    return this.DocsService.update(+id, updateDocsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.DocsService.remove(+id);
  }
}
