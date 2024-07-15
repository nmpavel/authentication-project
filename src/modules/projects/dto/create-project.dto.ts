
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    shortDescription: string;
    
    @IsOptional()
    description: string;

    @IsEmpty()
    urlSlug: string;
}
