import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  // Map CreateBookDto to Prisma's BookCreateInput
  async create(createBookDto: CreateBookDto) {
    const data: Prisma.BookCreateInput = {
      title: createBookDto.title,
      author: createBookDto.author,
      publishedAt: createBookDto.publishedAt,
    };
    const bookCreate = await this.prisma.book.create({ data });

    return bookCreate;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const data: Prisma.BookUpdateInput = {
      title: updateBookDto.title,
      author: updateBookDto.author,
      publishedAt: updateBookDto.publishedAt,
    };

    const bookUpdate = await this.prisma.book.update({
      where: { id },
      data,
    });

    return bookUpdate;
  }

  async remove(id: number) {
    const bookRemove = await this.prisma.book.delete({ where: { id } });
    return bookRemove;
  }
}
