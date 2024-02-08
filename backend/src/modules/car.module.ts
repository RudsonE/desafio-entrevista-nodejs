import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CarController } from 'src/controllers/car.controller';
import { CarService} from 'src/services/car.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, JwtService],
})
export class CarModule {}
