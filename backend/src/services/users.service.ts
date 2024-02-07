import {HttpStatus, Injectable } from "@nestjs/common";
import {PrismaClient, Prisma} from "@prisma/client";

@Injectable()
export class UserService{
    private prisma = new PrismaClient();
    async setUser(data) {
        try {
            const findNotUnique = await this.prisma.user.findUnique({
                where:{
                    email: data.email
                }
            })
            if(!findNotUnique){
                await this.prisma.user.create({
                    data: {...data}
                })

                return {success: true, message: "User created successfully.", code: HttpStatus.CREATED}
            } else {
                return {success: false, message: "User already exists", code: HttpStatus.CONFLICT}
            }
        } catch (error) {
            console.error("Failed to create new user:", error);
            return { success: false, message: "Failed to create new user", code: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }   

    getUser(): object{
        return {user: "fulano"}
    }

    loginUser(): object{
        return {user: "fulano"}
    }
}