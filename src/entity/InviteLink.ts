import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { IInviteLink, IScope, IUserRoles } from "../types";
import Organization from "./Organization";
import User from "./User";

@Entity()
export default class InviteLink implements IInviteLink{

	@PrimaryGeneratedColumn()
    id: string;

    @Column({ type: "varchar", nullable: false, length: 128})
	orgId: string

    @ManyToOne(
    	() => Organization,
    	({ id }) => id,
    	{ onDelete: 'SET NULL', onUpdate: 'CASCADE'},
    )
    @JoinColumn([
    	{ name: "orgId", referencedColumnName: "id" }
    ])
    org: Organization

    @ManyToOne(
    	() => User,
    	({ id }) => id,
    	{ onDelete: 'SET NULL', onUpdate: 'CASCADE'},
    )
    @JoinColumn([
    	{ name: "createdBy", referencedColumnName: "id" }
    ])
    user: User

    @Column()
    expiresAt: Date

    @Column({ type: "simple-array", nullable: false })
    scopes: IScope[]

    @CreateDateColumn({ name: 'created_at', nullable: false })
	createdAt: Date

    @Column({ type: "varchar", nullable: false, length: 128})
	createdBy: string
}