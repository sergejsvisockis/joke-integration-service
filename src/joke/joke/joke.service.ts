import {Injectable} from '@nestjs/common';
import {JokeResponseDto} from '../dto/joke.response.dto';
import {JokeRequestDto} from '../dto/joke.request.dto';
import {JokeUpdateRequestDto} from '../dto/joke.update.request.dto';
import {PrismaService} from '../../prisma/prisma.service';
import {Joke} from '@prisma/client';
import {JokeClient} from "./joke.client";

@Injectable()
export class JokeService {

  constructor(
      private readonly prismaService: PrismaService,
      private readonly jokeClient: JokeClient,
  ) {}

  async importJokes(): Promise<JokeResponseDto[]> {
    const response = await this.jokeClient.fetchJoke();
    const createdJokes = response.map(joke => ({
      id: joke.id,
      joke: joke.joke,
    }));
    await this.prismaService.joke.updateMany({
      data: createdJokes,
    });
    const savedJokes = await this.prismaService.joke.findMany({
      where: {
        id: {
          in: createdJokes.map(joke => joke.id),
        },
      },
    });

    return savedJokes.map(joke => this.toResponse(joke));
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
        id: this.generateRandomId(10),
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
    return new JokeResponseDto(entity.id, entity.joke);
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
