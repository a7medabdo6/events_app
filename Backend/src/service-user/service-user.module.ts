import { Module } from '@nestjs/common';
import { ServiceUserService } from './service-user.service';
import { ServiceUserController } from './service-user.controller';
import { ServiceUser } from './entities/service-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceUser])],

  controllers: [ServiceUserController],
  providers: [ServiceUserService],
})
export class ServiceUserModule {}
