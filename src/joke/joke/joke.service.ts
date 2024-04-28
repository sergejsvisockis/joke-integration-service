import { Injectable } from '@nestjs/common';
import { JokeImportRequestDto } from '../dto/joke.import.request.dto';
import { JokeResponseDto } from '../dto/joke.response.dto';
import { JokeRequestDto } from '../dto/joke.request.dto';
import { JokeUpdateRequestDto } from '../dto/joke.update.request.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Joke } from '@prisma/client';

@Injectable()
export class JokeService {
  private jokeManagerHost: string = 'https://icanhazdadjoke.com/j/';

  constructor(private readonly prismaService: PrismaService) {}

  async importJoke(request: JokeImportRequestDto): Promise<JokeResponseDto> {
    const response = await fetch(this.jokeManagerHost + request.jokeId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const bodyAsResponse = (await response.json()) as JokeResponseDto;
    const savedJoke = await this.prismaService.joke.create({
      data: {
        id: bodyAsResponse.id,
        joke: bodyAsResponse.joke,
      },
    });
    return this.toResponse(savedJoke);
  }

  async findAll(): Promise<JokeResponseDto[]> {
    const jokeEntities = await this.prismaService.joke.findMany();
    return jokeEntities.map((entity) => this.toResponse(entity));
  }

  async findById(jokeId: string): Promise<JokeResponseDto> {
    const joke = await this.prismaService.joke.findUnique({
      where: {
        id: jokeId,
      },
    });
    return this.toResponse(joke);
  }

  async save(request: JokeRequestDto): Promise<JokeResponseDto> {
    const savedJoke = await this.prismaService.joke.create({
      data: {
        id: RandomIdGenerator.generateRandomId(10),
        joke: request.joke,
      },
    });
    return this.toResponse(savedJoke);
  }

  async update(request: JokeUpdateRequestDto): Promise<JokeResponseDto> {
    const savedJoke = await this.prismaService.joke.update({
      where: { id: request.id },
      data: {
        joke: request.joke,
      },
    });
    return this.toResponse(savedJoke);
  }

  async delete(jokeId: string): Promise<void> {
    await this.prismaService.joke.delete({
      where: {
        id: jokeId,
      },
    });
  }

  toResponse(entity: Joke): JokeResponseDto {
    return new JokeResponseDto(
      entity.id,
      entity.joke,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
