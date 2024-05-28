import { IsBoolean, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  notes?: string;

  @IsBoolean()
  is_archived?: boolean;
}
