import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { IOrgMember, IScope, IUserRoles } from "../types";
import Organization from "./Organization";
import User from "./User";

@Entity()
export default class OrgMember implements IOrgMember{

	@PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false, length: 128})
	orgId: string

    @Column({ type: "varchar", nullable: false, length: 128})
	userId: string

    @ManyToOne(
    	() => Organization,
    	({ memeberships }) => memeberships,
    	{ onDelete: 'SET NULL', onUpdate: 'CASCADE'},
    )
    @JoinColumn([
    	{ name: "orgId", referencedColumnName: "id" }
    ])
    org: Organization

    @ManyToOne(
    	() => User,
    	({ memeberships }) => memeberships,
    	{ onDelete: 'SET NULL', onUpdate: 'CASCADE'},
    )
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User

    @CreateDateColumn({ name: 'created_at', nullable: false })
	addedAt: Date

    @Column({ type: "varchar", nullable: false, length: 128})
	addedBy: string

    @Column({ type: "varchar", nullable: false, length: 128})
	role: IUserRoles

    @Column({ type: "simple-array", nullable: false })
	scopes: IScope[]
}