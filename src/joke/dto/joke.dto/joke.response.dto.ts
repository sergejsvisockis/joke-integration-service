export class JokeResponseDto {
  id: string;
  joke: string;

  constructor(id: string, joke: string) {
    this.id = id;
    this.joke = joke;
  }
}
