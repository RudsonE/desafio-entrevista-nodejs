import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    setUser(): object{
        return {user: "fulano"}
    }
}