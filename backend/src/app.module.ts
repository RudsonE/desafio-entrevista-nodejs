import { Module } from '@nestjs/common';
import { UserModule } from './modules/users.module';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
