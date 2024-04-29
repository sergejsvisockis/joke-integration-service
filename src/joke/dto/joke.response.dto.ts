import { ApiProperty } from '@nestjs/swagger';

export class JokeResponseDto {
  @ApiProperty({ description: 'The ID of the joke', example: 'R7UfaahVfFd' })
  id: string;

  @ApiProperty({
    description: 'The joke text',
    example: 'Why did the chicken cross the road?',
  })
  joke: string;

  constructor(id: string, joke: string) {
    this.id = id;
    this.joke = joke;
  }
}
