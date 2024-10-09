import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Bike table structure
@Entity()
export class Bike {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     make: string;

     @Column()
     model: string;

     @Column()
     year: number;

     @Column()
     type: string;
}