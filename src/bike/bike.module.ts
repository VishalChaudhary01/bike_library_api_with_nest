import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeService } from './services/bike.service';
import { BikeController } from './controllers/bike.controller';
import { Bike } from './entities/bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bike])],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}