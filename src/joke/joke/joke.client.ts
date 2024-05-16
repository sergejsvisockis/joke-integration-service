import {Injectable} from "@nestjs/common";

@Injectable()
export class JokeClient {
    private jokeManagerHost: string = 'https://icanhazdadjoke.com/search';

    async fetchJoke(): Promise<Joke[]> {
        const response = await fetch(this.jokeManagerHost, {
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
        const responseAsData = await response.json() as JokeResponseData;
        return responseAsData.results;
    }

}

interface JokeResponseData {
    current_page: number;
    limit: number;
    next_page: number;
    previous_page: number;
    results: Joke[];
    search_term: string;
    status: number;
    total_jokes: number;
    total_pages: number;
}

interface Joke {
    id: string;
    joke: string;
}
