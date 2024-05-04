import {JokeClient} from "./joke.client";
import {JokeResponseDto} from "../dto/joke.response.dto";
import {JokeImportRequestDto} from "../dto/joke.import.request.dto";

describe('JokeClient', () => {
    let jokeClient: JokeClient;

    beforeEach(() => {
        jokeClient = new JokeClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch a joke successfully', async () => {
        const expectedResponse: JokeResponseDto = {
            id: 'abc123',
            joke: "Why don't scientists trust atoms? Because they make up everything!",
        };

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(expectedResponse),
            ok: true,
            status: 200,
        } as any);

        const jokeResponse = await jokeClient.fetchJoke({jokeId: '1'});

        expect(jokeResponse).toEqual(expectedResponse);
    });

    it('should handle failed joke fetch', async () => {
        const request: JokeImportRequestDto = {jokeId: '123'};

        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn().mockResolvedValue({
                ok: false,
                status: 500,
            }),
        );

        await expect(jokeClient.fetchJoke(request)).rejects.toThrow(
            'Failed to import joke. HTTP Status code: 500',
        );
    });
});
