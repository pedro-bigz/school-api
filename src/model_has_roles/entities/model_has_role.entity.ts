import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "@app/roles/entities/role.entity";
import { User } from "@app/users/entities/user.entity";

@Entity({ name: 'model_has_roles' })
export class ModelHasRole {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    public userId: number

    @Column({ type: 'bigint', unsigned: true })
    public roleId: number

    @ManyToOne(() => Role, (role) => role.modelHasRoles)
    public role: Role

    @ManyToOne(() => User, (user) => user.modelHasRoles)
    public user: User
}
