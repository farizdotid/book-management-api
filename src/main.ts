import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Setup for enable validation globally
   */
  app.useGlobalPipes(new ValidationPipe({transform:true}));

  /**
   * Setup for Swagger
   */
  const configSwagger = new DocumentBuilder()
    .setTitle('Book Management API')
    .setDescription('The book management API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, document);

  /**
   * Setup for Apply global response interceptor and exception filter
   */
  app.useGlobalInterceptors(new ResponseInterceptor);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
