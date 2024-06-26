import {Test, TestingModule} from '@nestjs/testing';
import {JokeController} from './joke.controller';
import {JokeService} from './joke.service';
import {JokeResponseDto} from '../dto/joke.response.dto';
import {JokeRequestDto} from '../dto/joke.request.dto';
import {JokeUpdateRequestDto} from '../dto/joke.update.request.dto';

describe('JokeController', () => {
    let controller: JokeController;
    let service: JokeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [JokeController],
            providers: [
                {
                    provide: JokeService,
                    useValue: {
                        importJoke: jest.fn(),
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<JokeController>(JokeController);
        service = module.get<JokeService>(JokeService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should import the joke from the external source', async () => {
        const response: JokeResponseDto[] = [new JokeResponseDto('123', 'Test joke')];
        jest.spyOn(service, 'importJokes').mockResolvedValue(response);

        const result = await controller.searchJokes();
        expect(result).toEqual(response);
    });

    it('should find all the jokes', async () => {
        const response: JokeResponseDto[] = [
            new JokeResponseDto('1', 'Joke 1'),
            new JokeResponseDto('2', 'Joke 2'),
        ];
        jest.spyOn(service, 'findAll').mockResolvedValue(response);

        const result = await controller.findAll();
        expect(result).toEqual(response);
    });

    it('should find the joke by ID', async () => {
        const jokeId = '123';
        const response: JokeResponseDto = new JokeResponseDto('123', 'Test joke');
        jest.spyOn(service, 'findById').mockResolvedValue(response);

        const result = await controller.findById(jokeId);
        expect(result).toEqual(response);
    });

    it('should save Joke', async () => {
        const request: JokeRequestDto = {joke: 'New joke'};
        const response: JokeResponseDto = new JokeResponseDto('123', 'New joke');
        jest.spyOn(service, 'save').mockResolvedValue(response);

        const result = await controller.create(request);
        expect(result).toEqual(response);
    });

    it('should update the joke', async () => {
        const request: JokeUpdateRequestDto = {id: '123', joke: 'Updated joke'};
        const response: JokeResponseDto = new JokeResponseDto(
            '123',
            'Updated joke',
        );
        jest.spyOn(service, 'update').mockResolvedValue(response);

        const result = await controller.update(request);
        expect(result).toEqual(response);
    });

    it('should delete the joke', async () => {
        const jokeId = '123';
        jest.spyOn(service, 'delete').mockResolvedValue();

        const result = await controller.delete(jokeId);
        expect(result).toBeUndefined();
    });
});
