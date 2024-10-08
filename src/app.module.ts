import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BikeController } from './bike/controllers/bike.controller';
import { BikeService } from './bike/services/bike.service';

@Module({
  imports: [],
  controllers: [BikeController],
  providers: [AppService, BikeService],
})
export class AppModule {}
