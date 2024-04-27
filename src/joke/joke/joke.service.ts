import { Injectable } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JokeEntity } from '../entity/joke.entity/joke.entity';
import { Repository } from 'typeorm';
import { JokeImportResponseDto } from '../dto/joke.dto/joke.import.response.dto';

@Injectable()
export class JokeService {
  private jokeManagerHost: string = 'https://icanhazdadjoke.com/j/';
  constructor(
    @InjectRepository(JokeEntity)
    private jokeRepository: Repository<JokeEntity>,
  ) {}

  async importJoke(
    request: JokeImportRequestDto,
  ): Promise<JokeImportResponseDto> {
    const response = await fetch(this.jokeManagerHost + request.jokeId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const bodyAsResponse = (await response.json()) as JokeImportResponseDto;
    const jokeEntity = this.jokeRepository.create({
      id: bodyAsResponse.id,
      joke: bodyAsResponse.joke,
    });
    await this.jokeRepository.save(jokeEntity);
    return bodyAsResponse;
  }
}
