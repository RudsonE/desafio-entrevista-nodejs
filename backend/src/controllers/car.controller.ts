import {Controller, Get, Post, Body,Req,  Res, UseGuards } from '@nestjs/common';
import { CarService } from 'src/services/car.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller("/car")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CarController{
    constructor(readonly carService: CarService){}
    @Post("/set")
    @ApiOperation({
        summary: 'Cria um novo leilão.',
        description: 'Cria um novo leilão com base nos dados fornecidos.',
      })
      @ApiBody({
        description: 'Dados do leilão',
        schema: {
          type: 'object',
          properties: {
                name: { "type": "string", "description": "Nome do leilão" },
                email: { "type": "string", "description": "E-mail do leilão" },
                password: { "type": "string", "description": "Senha do leilão" },
                year: { "type": "number", "description": "Ano do carro" },
                brand: { "type": "string", "description": "Marca do carro" },
                model: { "type": "string", "description": "Modelo do carro" },
                startingBid: { "type": "number", "description": "Lance inicial do leilão" },
                auctionStartDate: { "type": "string", "description": "Data de início do leilão" },
                auctionEndDate: { "type": "string", "description": "Data de término do leilão" }
          },
        },
      })
    async createCarAuition(@Body() data,@Req() request, @Res() res){
        const creatorId = request.user.sub;
        const car = await this.carService.setCar(creatorId, data)
        res.status(200).json({car})
    }
}