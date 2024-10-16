import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Publication date of the book',
    example: '2024-10-15T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)  // Ensure this is converted to a Date object
  publishedAt: Date;
}