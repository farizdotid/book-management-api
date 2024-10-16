import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return books fetched successfully message', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockBooks);

      const result = await controller.findAll();
      expect(result).toEqual({
        message: 'Books fetched successfully',
        data: mockBooks,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const mockBook = { id: 1, title: 'Book 1', author: 'Author 1', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockBook);

      const result = await controller.findOne('1');
      expect(result).toEqual({
        message: `Book with ID 1 fetched successfully`,
        data: mockBook,
      });
    });
  });

  describe('create', () => {
    it('should return a created book', async () => {
      const newBook = { title: 'New Book', author: 'New Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      const createdBook = { id: 1, ...newBook };
      jest.spyOn(service, 'create').mockResolvedValue(createdBook);

      const result = await controller.create(newBook);
      expect(result).toEqual({
        message: 'Book created successfully',
        data: createdBook,
      });
    });
  });

  describe('update', () => {
    it('should return an updated book', async () => {
      const updatedBook = { id: 1, title: 'Updated Book', author: 'Updated Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(service, 'update').mockResolvedValue(updatedBook);

      const result = await controller.update('1', updatedBook);
      expect(result).toEqual({
        message: `Book with ID 1 updated successfully`,
        data: updatedBook,
      });
    });
  });

  describe('remove', () => {
    it('should return a deleted book', async () => {
      const deletedBook = { id: 1, title: 'Deleted Book', author: 'Deleted Author', publishedAt: new Date(), createdAt: new Date(), updateAt: new Date() };
      jest.spyOn(service, 'remove').mockResolvedValue(deletedBook);

      const result = await controller.remove('1');
      expect(result).toEqual({
        message: `Book with ID 1 deleted successfully`,
        data: deletedBook,
      });
    });
  });
});
