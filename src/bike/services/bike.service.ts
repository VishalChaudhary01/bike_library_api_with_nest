import { Injectable } from '@nestjs/common';

@Injectable()
export class BikeService {
     findAll(): string {
          return "Hi there"
     }
}
