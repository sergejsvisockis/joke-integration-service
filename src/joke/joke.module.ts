import { Module } from '@nestjs/common';
import { JokeController } from './joke/joke.controller';
import { JokeService } from './joke/joke.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JokeController],
  providers: [JokeService],
})
export class JokeModule {}
