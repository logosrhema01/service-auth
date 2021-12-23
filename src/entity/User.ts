import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../types";

@Entity()
export default class {

	@PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
	id: number

	@Column({ nullable: false })
	teamId: string

	@Column({ name: 'name', nullable: false })
	name: string

	@Column({ name: 'age', type: 'int', unsigned: true, nullable: false })
	age: number

	@CreateDateColumn({ name: 'created_at', nullable: false })
	createdAt: Date
}