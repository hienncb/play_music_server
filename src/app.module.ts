import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service'
import { MusicController } from './music/music.controller'
import { MusicService } from './music/music.service';
@Module({
  imports: [],
  controllers: [AppController, CatsController, MusicController],
  providers: [AppService, CatsService, MusicService],
})
export class AppModule {}
