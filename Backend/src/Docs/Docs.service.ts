import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDocsDto } from './dto/create-Docs.dto';
import { UpdateDocsDto } from './dto/update-Docs.dto';
import { Docs } from './entities/Docs.entity';

@Injectable()
export class DocsService {
  constructor(@InjectRepository(Docs) private repo: Repository<Docs>) {}

  async create(createDocsDto: CreateDocsDto, user: User) {
    const Docs = await this.repo.create(createDocsDto);
    Docs.user = user;
    return this.repo.save(Docs);
  }

  findAll() {
    return `This action returns all Docs`;
  }

  async findOne(id: number) {
    const Docs = await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });
    return Docs;
  }

  update(id: number, updateDocsDto: UpdateDocsDto) {
    return `This action updates a #${id} Docs`;
  }

  remove(id: number) {
    return `This action removes a #${id} Docs`;
  }
}
