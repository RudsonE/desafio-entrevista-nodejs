import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserService } from '../services/users.service';



@Controller('/user')
export class UserController{
    constructor(private readonly userService: UserService) {}
    @Post("/set")
    async createUser(@Body() data, @Res() res) {
        const user = await this.userService.setUser(data)
        res.status(user.code).json(user)
        
    }
       

    @Post("/login")
    async loginUser(@Body() data) {
        const birth = data.birth
        //return this.userService.loginUser();
        return birth
    }
}