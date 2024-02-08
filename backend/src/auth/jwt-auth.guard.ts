import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConstants from 'src/constants';

@Injectable()
export class JwtAuthGuard {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Send autenthication token');
    }

    try {
      const decoded = this.jwtService.verify(token, {secret: jwtConstants.secret });
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}
