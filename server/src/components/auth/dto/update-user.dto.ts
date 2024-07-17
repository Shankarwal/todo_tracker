import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly password: string;
}
