import { Module } from '@nestjs/common';
import { JokeController } from './joke/joke.controller';
import { JokeService } from './joke/joke.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeEntity } from './entity/joke.entity/joke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JokeEntity])],
  controllers: [JokeController],
  providers: [JokeService],
})
export class JokeModule {}
