import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bike } from '../entities/bike.entity';
import { Repository } from 'typeorm';
import { CreateBikeDto } from '../dto/create-bike.dto';

@Injectable()
export class BikeService {
     constructor(
          @InjectRepository(Bike)
          private readonly bikeRepository: Repository<Bike>,
     ) {}

     async findAll(): Promise<Bike[]> {
          return this.bikeRepository.find();
     }

     async create(createBikeDto: CreateBikeDto): Promise<Bike> {
          const bike = this.bikeRepository.create(createBikeDto);
          return await this.bikeRepository.save(bike);
     }

     async update(id: string, createBikeDto: CreateBikeDto): Promise<Bike> {
          const bike = await this.bikeRepository.findOne({ where: { id } });
          if (!bike) {
               throw new NotFoundException('Bike not found');
          }
          Object.assign(bike, createBikeDto);
          return this.bikeRepository.save(bike);
     }

     async remove(id: string): Promise<void> {
          const bike = await this.bikeRepository.findOne({ where: { id } });
          if (!bike) {
               throw new NotFoundException('Bike not found');
          }
          await this.bikeRepository.remove(bike);
     }
}
