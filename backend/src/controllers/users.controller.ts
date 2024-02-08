import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from '../services/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/set')
  @ApiOperation({
    summary: 'Cria um novo usuário.',
    description: 'Cria um novo usuário com base nos dados fornecidos.',
  })
  @ApiBody({
    description: 'Dados do usuário',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nome do usuário' },
        email: { type: 'string', description: 'E-mail do usuário' },
        password: { type: 'string', description: 'Senha do usuário' },
      },
    },
  })
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() res,
  ) {
    const user = await this.userService.setUser(createUserDto);
    res.status(user.code).json(user);
  }

  @Post('/login')
  async loginUser(@Body() data, @Res() res, @Req() req) {
    if(!req.body || Object.keys(req.body).length === 0){
      res.status(401).json({ message: "Send your credentials."});
    }
    try {
      const login = await this.userService.loginUser(data);
      if (login.token) {
        res.cookie('nnjwt', login.token, { httpOnly: true });
      }
      res.status(login.code).json({ message: login.message });
    } catch (e) {
      console.log('');
    }
  }

  @Get('/logout')
  async logoutUser(@Body() data, @Res() res){
    res.cookie('nnjwt', '', {expires: new Date(0)})
    res.status(200).json({ message: 'Logged out.' });
  }
}
