import { Injectable } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JokeEntity } from '../entity/joke.entity/joke.entity';
import { Repository } from 'typeorm';
import { JokeResponseDto } from '../dto/joke.dto/joke.response.dto';

@Injectable()
export class JokeService {
  private jokeManagerHost: string = 'https://icanhazdadjoke.com/j/';
  constructor(
    @InjectRepository(JokeEntity)
    private jokeRepository: Repository<JokeEntity>,
  ) {}

  async importJoke(request: JokeImportRequestDto): Promise<JokeResponseDto> {
    const response = await fetch(this.jokeManagerHost + request.jokeId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const bodyAsResponse = (await response.json()) as JokeResponseDto;
    const jokeEntity = this.jokeRepository.create({
      id: bodyAsResponse.id,
      joke: bodyAsResponse.joke,
    });
    await this.jokeRepository.save(jokeEntity);
    return bodyAsResponse;
  }

  async findAll(): Promise<JokeResponseDto[]> {
    const jokeEntities = await this.jokeRepository.find();
    return jokeEntities.map(
      (entity) => new JokeResponseDto(entity.id, entity.joke),
    );
  }

  async findById(jokeId: string): Promise<JokeResponseDto> {
    const joke = await this.jokeRepository.findOneBy({
      id: jokeId,
    });
    return new JokeResponseDto(joke.id, joke.joke);
  }
}
