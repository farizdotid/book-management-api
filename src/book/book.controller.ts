import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  async create(@Body() createBookDto: CreateBookDto) {
    const bookCreate = await this.bookService.create(createBookDto);
    return {
      message: 'Book created successfully',
      data: bookCreate,
    };
  }

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    return {
      message: 'Books fetched successfully',
      data: books,
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(+id);
    return {
      message: `Book with ID ${id} fetched successfully`,
      data:book ,
    };
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  @ApiBody({ type: UpdateBookDto })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const bookUpdate = await this.bookService.update(+id, updateBookDto);
    return {
      message: `Book with ID ${id} updated successfully`,
      data: bookUpdate,
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  async remove(@Param('id') id: string) {
    const bookRemove = await this.bookService.remove(+id);
    return {
      message: `Book with ID ${id} deleted successfully`,
      data: bookRemove,
    };
  }
}
