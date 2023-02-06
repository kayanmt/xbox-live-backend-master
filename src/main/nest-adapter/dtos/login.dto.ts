import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NestLoginDto {
  @IsString()
  @ApiProperty({
    description: 'Represents the user email.',
    example: 'douglasvolcato@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Represents the user password.',
    example: 'SuperPassword2000!',
  })
  password: string;
}
