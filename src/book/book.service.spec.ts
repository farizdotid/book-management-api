import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookService', () => {
  let service: BookService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: {
            book: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() },
      ];
      jest.spyOn(prismaService.book, 'findMany').mockResolvedValue(mockBooks);

      const result = await service.findAll();
      expect(result).toEqual(mockBooks);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const mockBook = { id: 1, title: 'Book 1', author: 'Author 1', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(mockBook);

      const result = await service.findOne(1);
      expect(result).toEqual(mockBook);
    });

    it('should return null if book is not found', async () => {
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new book', async () => {
      const newBook = { title: 'New Book', author: 'New Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      const createdBook = { id: 1, ...newBook };
      jest.spyOn(prismaService.book, 'create').mockResolvedValue(createdBook);

      const result = await service.create(newBook);
      expect(result).toEqual(createdBook);
    });
  });

  describe('update', () => {
    it('should update and return the book', async () => {
      const updatedBook = { id: 1, title: 'Updated Book', author: 'Updated Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(prismaService.book, 'update').mockResolvedValue(updatedBook);

      const result = await service.update(1, updatedBook);
      expect(result).toEqual(updatedBook);
    });
  });

  describe('remove', () => {
    it('should delete the book', async () => {
      const deletedBook = { id: 1, title: 'Deleted Book', author: 'Deleted Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(prismaService.book, 'delete').mockResolvedValue(deletedBook);

      const result = await service.remove(1);
      expect(result).toEqual(deletedBook);
    });
  });
});