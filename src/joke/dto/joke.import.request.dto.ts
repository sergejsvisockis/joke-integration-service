import { ApiProperty } from '@nestjs/swagger';

export class JokeImportRequestDto {
  @ApiProperty({
    description: 'The ID of the joke to import',
    example: 'R7UfaahVfFd',
  })
  jokeId: string;
}