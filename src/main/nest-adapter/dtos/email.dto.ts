import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmailDto {
  @IsString()
  @ApiProperty({
    description: 'Represents the user email.',
    example: 'douglasvolcato@gmail.com',
  })
  email: string;
}
