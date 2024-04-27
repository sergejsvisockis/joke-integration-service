import { JokeService } from './joke.service';
import { Repository } from 'typeorm';
import { JokeEntity } from '../entity/joke.entity/joke.entity';
import { JokeResponseDto } from '../dto/joke.dto/joke.response.dto';
import { JokeImportRequestDto } from '../dto/joke.dto/joke.import.request.dto';
import { JokeUpdateRequestDto } from '../dto/joke.dto/joke.update.request.dto';
import { JokeRequestDto } from '../dto/joke.dto/joke.request.dto';

describe('JokeService', () => {
  let jokeRepository: Repository<JokeEntity>;
  let jokeService: JokeService;

  beforeEach(() => {
    jokeRepository = {} as Repository<JokeEntity>; // Mock repository
    jokeService = new JokeService(jokeRepository);
  });

  it('should import the joke', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        id: 'abc123',
        joke: 'Why did the chicken cross the road?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    jokeRepository.create = jest.fn().mockReturnValue(new JokeEntity());
    jokeRepository.save = jest.fn().mockResolvedValue(new JokeEntity());

    const request: JokeImportRequestDto = { jokeId: '123' };
    const result = await jokeService.importJoke(request);

    expect(result).toBeInstanceOf(JokeResponseDto);
    expect(jokeRepository.create).toHaveBeenCalledTimes(1);
    expect(jokeRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should find all jokes', async () => {
    const mockJokes: JokeEntity[] = [
      { id: '1', joke: 'Joke 1' },
    ] as JokeEntity[];
    jokeRepository.find = jest.fn().mockResolvedValue(mockJokes);

    const result = await jokeService.findAll();

    expect(result).toEqual(
      mockJokes.map((joke) => jokeService.toResponse(joke)),
    );
  });

  it('should find joke by ID', async () => {
    const mockJoke: JokeEntity = { id: '1', joke: 'Joke 1' } as JokeEntity;
    jokeRepository.findOneBy = jest.fn().mockResolvedValue(mockJoke);

    const jokeId = '1';
    const result = await jokeService.findById(jokeId);

    expect(result).toEqual(jokeService.toResponse(mockJoke));
  });

  it('should create a joke', async () => {
    jokeRepository.create = jest.fn().mockReturnValue(new JokeEntity());
    jokeRepository.save = jest.fn().mockResolvedValue(new JokeEntity());

    const request: JokeRequestDto = { joke: 'New joke' };
    const result = await jokeService.save(request);

    expect(result).toBeInstanceOf(JokeResponseDto);
    expect(jokeRepository.create).toHaveBeenCalledTimes(1);
    expect(jokeRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should update a joke', async () => {
    const mockJoke: JokeEntity = { id: '1', joke: 'Joke 1' } as JokeEntity;
    jokeRepository.findOneBy = jest.fn().mockResolvedValue(mockJoke);
    jokeRepository.save = jest.fn().mockResolvedValue(mockJoke);

    const request: JokeUpdateRequestDto = { id: '1', joke: 'Updated joke' };
    const result = await jokeService.update(request);

    expect(result).toEqual(jokeService.toResponse(mockJoke));
    expect(jokeRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(jokeRepository.save).toHaveBeenCalledWith(mockJoke);
  });

  it('should delete a joke', async () => {
    jokeRepository.delete = jest.fn().mockResolvedValue(undefined);

    const jokeId = '1';
    await jokeService.delete(jokeId);

    expect(jokeRepository.delete).toHaveBeenCalledWith(jokeId);
  });
});
