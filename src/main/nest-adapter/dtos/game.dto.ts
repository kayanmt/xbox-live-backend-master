import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NestGameDto {
  @IsString()
  @ApiProperty({
    description: 'Represents the game title.',
    example: 'Super Game',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Represents the game title.',
    example: 'Super Game',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Represents the game description.',
    example: 'This is a great game!',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Represents the game gender.',
    example: 'Adventure',
  })
  gender: string;

  @IsNumber()
  @ApiProperty({
    description: 'Represents the game release year.',
    example: 2000,
  })
  year: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Represents the game IMDB score.',
    example: 7,
  })
  imdbScore?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Represents the game trailer link.',
    example: 'https://www.youtube.com/watch?v=oRN6341NB7Y',
  })
  trailerYouTubeUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Represents the game gameplay link.',
    example: 'https://www.youtube.com/watch?v=SNESYou9gy8',
  })
  gameplayYouTubeUrl?: string;
}
