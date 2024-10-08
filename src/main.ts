import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);

  // Check the database connection status
  if (dataSource.isInitialized) {
    console.log('Database connected successfully.');
  } else {
    console.error('Failed to connect to the database.');
  }

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Bike Library API')
    .setDescription('API to manage a bike library')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
