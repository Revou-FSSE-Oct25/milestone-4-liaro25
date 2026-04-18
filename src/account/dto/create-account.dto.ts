import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  @Length(8, 8)
  accountNumber!: string;
}