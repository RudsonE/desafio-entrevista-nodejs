import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CarService {
  private prisma = new PrismaClient();
  async setCar(creatorId, data) {
    try {
      await this.prisma.auction.create({ data: { ...data, creatorId: creatorId } });
      return {
        message: 'Auction created.',
        code: HttpStatus.CREATED,
      };
    } catch (e) {
      throw new HttpException(
        'Fail to create auction.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
