import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  accountNumber!: string;
}