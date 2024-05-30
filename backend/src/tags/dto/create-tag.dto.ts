import {
    IsNotEmpty,
    IsString,
    MinLength,
    IsNumber
} from 'class-validator';

export class CreateTagDto {
    @IsString()
    @MinLength(2, { message: 'Tag must have at least 2 characters.' })
    @IsNotEmpty()
    tag: string;

    @IsNotEmpty()
    emoji: string;

    @IsNotEmpty()
    @IsNumber()
    note_id: number;
}
