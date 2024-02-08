import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

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

  async getCars(){
    try {
      return await this.prisma.auction.findMany()

    } catch (error) {
      return {
        message: 'Fail to get all Auctions',
        code: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async makeBid(data, userId){

    try {
      //const auction = await this.prisma.bid.findUnique({where: data.auctionId})

        await this.prisma.bid.create({data: {...data, userId}})
        return {
          message: `Bid added at ${data.auctionId}` ,
          code: HttpStatus.CREATED,
        };
      
      } catch(e){
        return {
          message: `Error: ${e}` ,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
  }

  async getAllBids(data){
      try {
        const bids = await this.prisma.bid.findMany({where:{auctionId: {equals: data.auctionId}}})
        return {
          bids,
          code: HttpStatus.CREATED,
        };
      } catch (error) {
        return {
          message: "Internal Error",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
  }
  
}
