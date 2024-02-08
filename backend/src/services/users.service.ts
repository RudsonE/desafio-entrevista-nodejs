import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  private prisma = new PrismaClient();
  async setUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    try {
      const findNotUnique = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!findNotUnique) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        return {
          success: true,
          message: 'User created successfully.',
          code: HttpStatus.CREATED,
        };
      } else {
        return {
          success: false,
          message: 'User already exists',
          code: HttpStatus.CONFLICT,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create new user',
        error: error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  private async getUser(email: string) {
    if (!email) {
      return null;
    }
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.getUser(email);
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (user && hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    try {
      if (!user) {
        return {
          message: 'Email or password does not match.',
          code: HttpStatus.UNAUTHORIZED,
        };
      }
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { message: 'Logged in.', code: HttpStatus.OK, token };
    } catch (e) {}
  }
}
