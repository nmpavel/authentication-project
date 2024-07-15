import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUsersDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    userType: string;
}