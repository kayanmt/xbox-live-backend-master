import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NestProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Represents the profile title.',
    example: ' ',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Represents the profile image.',
    example: 'https://avatars.githubusercontent.com/u/106124397?v=4',
  })
  imageUrl: string;
}
