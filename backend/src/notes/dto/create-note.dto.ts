import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
