import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { IUser, IUserCreateMethod } from "../types";
import OrgMember from "./OrgMember";

@Entity()
export default class User implements IUser{

	@PrimaryGeneratedColumn('uuid')
	id: string

	@OneToMany(() => OrgMember,
	({ user }) => user,
	{ onDelete: 'NO ACTION', onUpdate: 'CASCADE'},)
	memeberships!: OrgMember[];

	@Column({ name: 'first_name', nullable: false })
	firstName: string

	@Column({ name: 'last_name', nullable: false })
	lastName: string

	@Column({ name: 'last_used_org_id', nullable: false })
	lastUsedOrgId: string

	@Column({ nullable: false })
	email: string

	@Column({ nullable: false })
	location: string

	@Column({ nullable: false })
	dob: Date

	@Column({ nullable: false })
	gender: 'Male' | 'Female' | 'Other'

	@Column({ nullable: false })
	phone: string

	@Column({ nullable: false })
	referralCode: string

	@Column({ nullable: false })
	createdByMethod: IUserCreateMethod

	@Column({ type: 'json', nullable: true })
	notify: IUser['notify']

	@CreateDateColumn({ name: 'created_at', nullable: false })
	createdAt: Date

	@UpdateDateColumn({ name: 'created_at', nullable: false })
	updatedAt: Date

	@DeleteDateColumn({ name: 'created_at', nullable: false })
	disabledAt: Date
}