import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NestProfileGamesDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Represents an array of game IDs.',
    example: '["324123r3d3d3dq34, 234bx2783b7234nruyedy23, 2u8hd2873hd2je8ed"]',
  })
  favoriteGames: string[];
}
