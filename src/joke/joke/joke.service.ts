import { Injectable } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JokeEntity } from '../entity/joke.entity/joke.entity';
import { Repository } from 'typeorm';
import { JokeResponseDto } from '../dto/joke.dto/joke.response.dto';
import { JokeRequestDto } from '../dto/joke.dto/joke.request.dto';

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
    const savedJoke = await this.jokeRepository.save(jokeEntity);
    return this.toResponse(savedJoke);
  }

  async findAll(): Promise<JokeResponseDto[]> {
    const jokeEntities = await this.jokeRepository.find();
    return jokeEntities.map((entity) => this.toResponse(entity));
  }

  async findById(jokeId: string): Promise<JokeResponseDto> {
    const joke = await this.jokeRepository.findOneBy({
      id: jokeId,
    });
    return this.toResponse(joke);
  }

  async save(request: JokeRequestDto): Promise<JokeResponseDto> {
    const jokeEntity = this.jokeRepository.create({
      id: this.generateRandomId(10),
      joke: request.joke,
    });
    const savedJoke = await this.jokeRepository.save(jokeEntity);
    return this.toResponse(savedJoke);
  }

  toResponse(entity: JokeEntity): JokeResponseDto {
    return new JokeResponseDto(
      entity.id,
      entity.joke,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  generateRandomId(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return randomId;
  }
}
