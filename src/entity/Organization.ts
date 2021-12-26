import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { IOrganization, IScope, IUser } from "../types";
import OrgMember from "./OrgMember";
import InviteLink from "./InviteLink";

@Entity()
export default class Organization implements IOrganization{

	@PrimaryGeneratedColumn('uuid')
	id: string

	@OneToMany(() => OrgMember,
	({ org }) => org,
	{ onDelete: 'NO ACTION', onUpdate: 'CASCADE'})
	memeberships!: OrgMember[];

	@Column({ name: 'name', nullable: false })
	name: string

    @Column({ type: "simple-array", nullable: false })
	scopes: IScope[]

    @Column({ nullable: false })
	email: string

    @Column({ nullable: false })
	url: string

    @Column({ nullable: false, default: false })
	isHiring: boolean

    @Column({ nullable: false, default: false })
	isAdmitting: boolean

    @Column({ nullable: false })
	plan: string

    @OneToMany(() => InviteLink,
	({ id }) => id,
	{ onDelete: 'NO ACTION', onUpdate: 'CASCADE'})
	inviteLinks: InviteLink[]

    @Column({ nullable: false })
	mode: "online" | "traditional" | "hybrid"

	@CreateDateColumn({ name: 'created_at', nullable: false })
	createdAt: Date

    @UpdateDateColumn({ name: 'created_at', nullable: false })
	updatedAt: Date

	@DeleteDateColumn({ name: 'created_at', nullable: false })
	disabledAt: Date
}