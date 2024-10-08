import { Controller, Get, Param } from '@nestjs/common';

@Controller('bike')
export class BikeController {
  @Get()
  findAll(): string {
    return 'This action returns all bikes';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} bike`;
  }
}