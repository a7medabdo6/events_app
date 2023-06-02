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
      type: 'sqlite',
      database: 'data.db',
      // type: 'mysql',

      // host: 'db-mysql-fra1-00835-do-user-13515466-0.b.db.ondigitalocean.com',
      // port: 25060,
      // username: 'doadmin',
      // password: 'AVNS_f_8byhoNldd0WiFmg7A',
      // database: 'defaultdb',

      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'events',
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
