import { Module } from '@nestjs/common';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Docs } from './Docs/entities/Docs.entity';
import { CategoryModule } from './category/category.module';
import { DocsModule } from './Docs/Docs.module';
import { ServiceUserModule } from './service-user/service-user.module';
import { ServiceUser } from './service-user/entities/service-user.entity';
import { MeetingModule } from './meeting/meeting.module';
import { Meeting } from './meeting/entities/meeting.entity';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: './src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root2',
      password: '',
      database: 'events',
      entities: [User, Docs, ServiceUser, Meeting],
      synchronize: true,
    }),
    UsersModule,
    DocsModule,
    ServiceUserModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
