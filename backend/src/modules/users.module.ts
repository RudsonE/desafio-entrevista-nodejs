import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from 'src/controllers/users.controller';
import { UserService} from 'src/services/users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
