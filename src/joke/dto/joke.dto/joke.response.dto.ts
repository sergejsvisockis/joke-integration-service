export class JokeResponseDto {
  id: string;
  joke: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, joke: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.joke = joke;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
