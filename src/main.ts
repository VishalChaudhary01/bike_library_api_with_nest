import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);

  // Check the database connection status
  if (dataSource.isInitialized) {
    console.log('Database connected successfully.');
  } else {
    console.error('Failed to connect to the database.');
  }

  await app.listen(3000);
}
bootstrap();
