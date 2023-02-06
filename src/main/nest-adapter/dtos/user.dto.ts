import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NestUserDto {
  @IsString()
  @ApiProperty({
    description: 'Represents the user name.',
    example: ' ',
  })
  name: string;

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Represents the user CPF.',
    example: '12345678910',
  })
  cpf?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Represents the user status as an administrator.',
    example: true,
  })
  isAdmin?: boolean;
}
