import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/users.controller';
import { UserService} from 'src/controllers/users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
