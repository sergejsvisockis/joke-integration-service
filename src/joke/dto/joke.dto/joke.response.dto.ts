import { ApiProperty } from '@nestjs/swagger';

export class JokeResponseDto {
  @ApiProperty({ description: 'The ID of the joke', example: 'R7UfaahVfFd' })
  id: string;

  @ApiProperty({
    description: 'The joke text',
    example: 'Why did the chicken cross the road?',
  })
  joke: string;

  @ApiProperty({
    description: 'The creation date of the joke',
    example: '2022-04-28T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the joke',
    example: '2022-04-28T10:05:00.000Z',
  })
  updatedAt: Date;

  constructor(id: string, joke: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.joke = joke;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
