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
    @MinLength(3, { message: 'Emoji must have at least 3 characters.' })
    emoji: string;

    @IsNotEmpty()
    @IsNumber()
    note_id: number;
}
