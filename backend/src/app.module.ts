import { Module } from '@nestjs/common';
import { UserModule } from './modules/users.module';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConstants from './constants';



const jwtRegister = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: {expiresIn: "1h"},
})

@Module({
  imports: [jwtRegister, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
