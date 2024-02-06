import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserService } from './users.service';

@Controller()
export class UserController{
    constructor(private readonly userService: UserService) {}
    @Post("/set")
    createUser(): object {
        return this.userService.setUser()
    }
}