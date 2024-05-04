import {Injectable} from "@nestjs/common";
import {JokeImportRequestDto} from "../dto/joke.import.request.dto";
import {JokeResponseDto} from "../dto/joke.response.dto";

@Injectable()
export class JokeClient {
    private jokeManagerHost: string = 'https://icanhazdadjoke.com/j/';

    async fetchJoke(request: JokeImportRequestDto): Promise<JokeResponseDto> {
        const response = await fetch(this.jokeManagerHost + request.jokeId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(
                `Failed to import joke. HTTP Status code: ${response.status}`,
            );
        }
        return (await response.json()) as JokeResponseDto;
    }
}