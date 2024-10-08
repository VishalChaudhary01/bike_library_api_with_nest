import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BikeService } from '../services/bike.service';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bikes')
@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}
  // Fetch all bikes from database
  @Get()
  findAll() {
    return this.bikeService.findAll();
  }

  // Create new bike to the database
  @Post()
  create(@Body() createBikeDto: CreateBikeDto) {
    return this.bikeService.create(createBikeDto);
  }

  // Update bike by Id
  @Put(':id')
  update(@Param('id') id: string, @Body() createBikeDto: CreateBikeDto) {
    return this.bikeService.update(id, createBikeDto);
  }

  // Delete bike by Id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bikeService.remove(id);
  }
}