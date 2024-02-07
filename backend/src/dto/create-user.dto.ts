import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}

export class LoginUserDto {
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}