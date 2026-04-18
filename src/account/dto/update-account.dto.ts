import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAccountDto {
  @ApiPropertyOptional({ example: '87654321' })
  @IsOptional()
  @IsString()
  @Length(8, 8)
  accountNumber?: string;
}