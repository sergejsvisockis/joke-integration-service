import { Test, TestingModule } from '@nestjs/testing';
import { JokeService } from './joke.service';
import { JokeImportRequestDto } from '../dto/joke.import.request.dto';
import { JokeResponseDto } from '../dto/joke.response.dto';
import { JokeRequestDto } from '../dto/joke.request.dto';
import { JokeUpdateRequestDto } from '../dto/joke.update.request.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Joke } from '@prisma/client';
import { JokeClient } from './joke.client';

describe('JokeService', () => {
  let service: JokeService;
  let prismaService: PrismaService;
  let jokeClient: JokeClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokeService,
        JokeClient,
        {
          provide: PrismaService,
          useValue: {
            joke: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<JokeService>(JokeService);
    prismaService = module.get<PrismaService>(PrismaService);
    jokeClient = module.get<JokeClient>(JokeClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should import a joke', async () => {
    const request: JokeImportRequestDto = { jokeId: '123' };
    const expectedResponse: JokeResponseDto = {
      id: 'abc123',
      joke: "Why don't scientists trust atoms? Because they make up everything!",
    };

    jest.spyOn(jokeClient, 'fetchJoke').mockResolvedValue(expectedResponse);
    jest
        .spyOn(prismaService.joke, 'create')
        .mockResolvedValue(expectedResponse as Joke);

    const result = await service.importJoke(request);

    expect(result).toEqual(expectedResponse);
  });

  it('should find all jokes', async () => {
    const expectedResponse: JokeResponseDto[] = [
      {
        id: 'abc123',
        joke: "Why don't scientists trust atoms? Because they make up everything!",
      },
      {
        id: 'def456',
        joke: 'What do you get when you cross a snowman and a vampire? Frostbite!',
      },
    ];

    jest
        .spyOn(prismaService.joke, 'findMany')
        .mockResolvedValue(expectedResponse as Joke[]);

    const result = await service.findAll();

    expect(result).toEqual(expectedResponse);
  });

  it('should find a joke by id', async () => {
    const jokeId = '123';
    const expectedResponse: JokeResponseDto = {
      id: 'abc123',
      joke: "Why don't scientists trust atoms? Because they make up everything!",
    };

    jest
        .spyOn(prismaService.joke, 'findUnique')
        .mockResolvedValue(expectedResponse as Joke);

    const result = await service.findById(jokeId);

    expect(result).toEqual(expectedResponse);
  });

  it('should save a joke', async () => {
    const request: JokeRequestDto = { joke: 'some joke' };
    const expectedResponse: JokeResponseDto = {
      id: 'abc123',
      joke: "Why don't scientists trust atoms? Because they make up everything!",
    };

    jest
        .spyOn(prismaService.joke, 'create')
        .mockResolvedValue(expectedResponse as Joke);

    const result = await service.save(request);

    expect(result).toEqual(expectedResponse);
  });

  it('should update a joke', async () => {
    const request: JokeUpdateRequestDto = { id: '123', joke: 'updated joke' };
    const expectedResponse: JokeResponseDto = {
      id: '123',
      joke: 'updated joke',
    };

    jest
        .spyOn(prismaService.joke, 'update')
        .mockResolvedValue(expectedResponse as Joke);

    const result = await service.update(request);

    expect(result).toEqual(expectedResponse);
  });

  it('should delete a joke', async () => {
    const jokeId = '123';

    await service.delete(jokeId);

    expect(prismaService.joke.delete).toHaveBeenCalledWith({
      where: { id: jokeId },
    });
  });
});
