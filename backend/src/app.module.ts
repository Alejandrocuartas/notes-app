import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnv } from './app.environment';
import { UserModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnv('DB_HOST'),
      port: Number(getEnv('DB_PORT')),
      password: getEnv('DB_PASSWORD'),
      username: getEnv('DB_USERNAME'),
      entities: [
        __dirname + '/users/entities/*.entity{.ts,.js}',
        __dirname + '/notes/entities/*.entity{.ts,.js}',
        __dirname + '/tags/entities/*.entity{.ts,.js}',
      ],
      database: getEnv('DB_NAME'),
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    NotesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
