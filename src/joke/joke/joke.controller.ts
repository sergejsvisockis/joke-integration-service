import { Body, Controller, Post } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { JokeService } from './joke.service';
import { JokeImportResponseDto } from '../dto/joke.dto/joke.import.response.dto';

@Controller('joke')
export class JokeController {
  constructor(private jokeService: JokeService) {}
  @Post('import')
  importJoke(
    @Body() request: JokeImportRequestDto,
  ): Promise<JokeImportResponseDto> {
    return this.jokeService.importJoke(request);
  }
}
