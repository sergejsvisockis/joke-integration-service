import { ApiProperty } from '@nestjs/swagger';

export class JokeRequestDto {
  @ApiProperty({
    description: 'The joke text',
    example: 'Why did the chicken cross the road?',
  })
  joke: string;
}