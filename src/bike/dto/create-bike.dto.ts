import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateBikeDto {
     @IsString()
     make: string;

     @IsString()
     model: string;

     @IsInt()
     @Min(1000)
     @Max(new Date().getFullYear())
     year: number;

     @IsString()
     type: string;
}