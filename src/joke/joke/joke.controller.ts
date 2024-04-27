import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { JokeService } from './joke.service';
import { JokeResponseDto } from '../dto/joke.dto/joke.response.dto';
import { JokeRequestDto } from '../dto/joke.dto/joke.request.dto';

@Controller('joke')
export class JokeController {
  constructor(private jokeService: JokeService) {}
  @Post('import')
  importJoke(@Body() request: JokeImportRequestDto): Promise<JokeResponseDto> {
    return this.jokeService.importJoke(request);
  }
  @Get()
  findAll(): Promise<JokeResponseDto[]> {
    return this.jokeService.findAll();
  }
  @Get(':jokeId')
  findById(@Param('jokeId') jokeId: string): Promise<JokeResponseDto> {
    return this.jokeService.findById(jokeId);
  }
  @Post()
  create(request: JokeRequestDto): Promise<JokeResponseDto> {
    return this.jokeService.save(request);
  }
}
